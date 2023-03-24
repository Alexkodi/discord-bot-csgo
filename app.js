const fs = require("fs");

// JSON Operations
function read() {
	const jsonContent = fs.readFileSync("./players.json");
	return JSON.parse(jsonContent);
}

function write(jsonWrite) {
	const sorted = jsonWrite.sort((a, b) => (a.lvl < b.lvl ? 1 : -1));
	fs.writeFileSync("./players.json", JSON.stringify(sorted, null, 2));
	return true;
}

// Display whole database
function list() {
	let arrayList = [];
	read().forEach((element, index) => {
		arrayList.push(`\`${index}.\` - [${element.lvl}] *${element.name}*`);
	});
	arrayList.push(`\n\`Baza zawiera ${arrayList.length} dupeczek\``);
	const result = arrayList.join("\n");
	return result;
}
// Display lvl
function displayLvl(playerName) {
	const objectArray = read();
	const playerIndex = objectArray.findIndex(
		(o) => o.name.toLowerCase() === playerName
	);
	return `[${objectArray[playerIndex].lvl}] ${objectArray[playerIndex].name}`;
}

// Add player to database
function addPlayer(playerName, playerLvl) {
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
function draw() {
	// to do
}

module.exports = {
	list,
	displayLvl,
	addPlayer,
	removePlayer,
	changeName,
	changeLvl,
	displayQueue,
	addToQueue,
	removeFromQueue,
	draw,
};
