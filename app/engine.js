const { read, write } = require("./json-handler.js");
const {
	checkPermissionCSGOadmin,
	checkPermissionCSGO,
} = require("./json-handler.js");

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
function addPlayer(playerName, playerLvl, user) {
	const objectArray = read();
	objectArray.push({
		name: playerName,
		lvl: parseInt(playerLvl),
	});

	if (write(objectArray)) {
		return `Dodano \`${playerName}\`a 🫡`;
	} else {
		return "Nie udało się, Alex coś popsuł i nie działa";
	}
}

// Remove player from database
function removePlayer(playerName) {
	const objectArray = read();
	const playerIndex = objectArray.findIndex(
		(o) => o.name.toLowerCase() === playerName
	);
	objectArray.splice(playerIndex, 1);

	if (write(objectArray)) {
		return `Usunieto \`${playerName}\` 🫡`;
	} else {
		return "Nie udało się, Alex coś popsuł i nie działa";
	}
}

// Edit player name
function changeName(intent) {
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
function changeLvl(playerName, newLvl) {
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

// Queue
let queue = [];
// Display current queue
function displayQueue() {
	let arrayQueue = [];
	read().forEach((element, index) => {
		arrayQueue.push(`\`${index}.\` - [${element.lvl}] *${element.name}*`);
	});
	arrayQueue.push(`\n\`W kolejce jest ${arrayQueue.length} bambików\``);
	return arrayQueue.join("\n");
}

// Adding players to queue
function addToQueue(intents) {
	let player = intents.split("-");
	const objectArray = read();
	player.forEach((element, index) => {
		queue.push(objectArray[index]);
	});
}

// Removing players from queue
function removeFromQueue(index) {
	// to do
}

// Draw teams
function draw() {}

module.exports = {
	db,
	addPlayer,
	removePlayer,
	changeName,
	changeLvl,
	displayQueue,
	addToQueue,
	removeFromQueue,
	draw,
};
