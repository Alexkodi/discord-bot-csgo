const { read, write } = require("./json-handler.js");
const {
	checkPermissionCSGOadmin,
	checkPermissionCSGO,
} = require("./permission.js");

const cmd = require("./db-command.js");

// Display whole database
function db(flag) {
	let result = "Nie rozumiem";

	if (flag == undefined || null) {
		result = cmd.undefinedAttribute();
	} else if (!isNaN(flag)&& flag.length > 1) {
		result = "Nie wiem co to, ale poziom to cyfra [1 - 9]";
	} else if (!isNaN(flag) && flag.length === 1) {
		result = cmd.levelAttribute(flag);
	} else if (flag.startsWith("<")) {
		result = cmd.mentionAttribute(flag);
	} else if (/^[a-zA-Z]+$/.test(flag)) {
		result = cmd.nameAttribute(flag);
	}

	return result
}

// Add player to database
function addPlayer(playerName, playerLvl, dcid, user) {
	if (!checkPermissionCSGO(user)) {return "Nie masz uprawnień"}
	if (playerName == undefined || null) {
		return "Gdzie argumenty?"
	}
	let onlyID = dcid.replace(/[<>@]/g, "");

	return cmd.addToDatabase(playerName, playerLvl, onlyID)
}

// Remove player from database
function removePlayer(playerName, user) {
	if (!checkPermissionCSGOadmin(user)) {return "Nie masz uprawnień"}
	if (playerName == undefined || null) {
		return "Gdzie argumenty?"
	}
	return cmd.removeFromDatabase(playerName)
}

// Edit player name
function changeName(intent, user) {
	if (!checkPermissionCSGOadmin(user)) {return "Nie masz uprawnień"}
	if (intent == undefined || null) {
		return "Gdzie argumenty?"
	}
	const objectArray = read();
	const changesArray = intent.split(">");
	const playerIndex = objectArray.findIndex(
		(o) => o.name.toLowerCase() === changesArray[0]
	);
	objectArray[playerIndex].name = changesArray[1];

	if (write(objectArray)) {
		return `Zmieniono 🫡`;
	} else {
		return "Nie udało się, Alex coś popsuł i nie działa";
	}
}

// Edit player lvl
function changeLvl(playerName, newLvl, user) {
	if (!checkPermissionCSGOadmin(user)) {return "Nie masz uprawnień"}
	if (playerName == undefined || null) {
		return "Gdzie argumenty?"
	}
	const objectArray = read();
	const playerIndex = objectArray.findIndex(
		(o) => o.name.toLowerCase() === playerName
	);
	objectArray[playerIndex].lvl = parseInt(newLvl);

	if (write(objectArray)) {
		return `Zmieniono 🫡`;
	} else {
		return "Nie udało się, Alex coś popsuł i nie działa";
	}
}

// Queue ======================================================================
let queue = [];
// Display current queue
function displayQueue() {
	let arrayList =[]
	queue.forEach((element, index) => {
		arrayList.push(`\`${index}\` | [${element.lvl}] *${element.name}*`);
	});
	arrayList.push(`\n\`W kolejce jest ${arrayList.length} bambików\``);

	return arrayList.join("\n");
}

// Adding players to queue
function addToQueue(intents) {
	let player = intents.split("-");
	let playerWithoutRepetition  = player.filter((element, index) => {
		return player.indexOf(element) === index;
	});

	const objectArray = read();
	playerWithoutRepetition.forEach((element, index) => {
		queue.push(objectArray[element]);
	});
}

// Removing players from queue
function removeFromQueue(index) {
	queue.splice(index, 1)
}
function flushQueue() {
	queue = []
	return "Pusta";
}

// Draw teams
function draw() {
	
	if (queue.length < 10 ) {
		return "Za mało osób w kolejce"
	} else if (queue.length > 10) {
		return "Za dużo osób w kolejce"
	}

	function checkArrays(arr1, arr2) {
		let sum1 = arr1.reduce((a, b) => a + b.lvl, 0);
		let sum2 = arr2.reduce((a, b) => a + b.lvl, 0);
		let diff = Math.abs(sum1 - sum2);
		return diff <= 1;
	}
	
	let found = false;
	for (let i = 0; i < 2 ** 10; i++) {
		let array1 = [];
		let array2 = [];
		for (let j = 0; j < 10; j++) {
			if ((i >> j) & 1) {
				array1.push(queue[j]);
			} else {
				array2.push(queue[j]);
		  	}
		}
		if (array1.length == 5 && array2.length == 5 && checkArrays(array1, array2)) {
		  	found = true;
			let teamListBlue = [];
			let teamListRed = [];
			let s1 = 0;
			let s2 = 0;
		  	array1.forEach((element, index) => {
				teamListBlue.push(`💙 [${element.lvl}] *${element.name}*`);
				s1+=element.lvl
			});
			array2.forEach((element, index) => {
				teamListRed.push(`❤️ [${element.lvl}] *${element.name}*`);
				s2+=element.lvl
			});
    		let per1 = s1/(s1+s2)*100
    		let per2 = s2/(s1+s2)*100
			let stats = [
				`Niebiescy: ${s1} | ${per1.toFixed(1)}%`,
				`Czerwoni: ${s2} | ${per2.toFixed(1)}%`,
				`Numer kombinacji ${i}`
			]

		  return `${teamListBlue.join('\n')}\n\n${teamListRed.join('\n')}\n\`${stats.join('\n')}\``;
		//   break;
		}
	  }
	  
	  if (!found) {
		return "Nie znaleziono rozwiązania";
	  }
}

module.exports = {
	db,
	addPlayer,
	removePlayer,
	changeName,
	changeLvl,
	displayQueue,
	addToQueue,
	removeFromQueue,
	flushQueue,
	draw,
};
