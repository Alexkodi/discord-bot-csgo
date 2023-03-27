const { read, write } = require("./json-handler.js");

function undefinedAttribute() {
	let arrayList = [];

	read().forEach((element, index) => {
		arrayList.push(`\`${index}.\` - [${element.lvl}] *${element.name}*`);
	});
	arrayList.push(`\n\`Baza zawiera ${arrayList.length} dupeczek\``);

	return arrayList.join("\n");
}

function levelAttribute(lvl) {
	let list = [];

	read().forEach((element) => {
		if (element.lvl == lvl) {
			list.push(`${element.name}`);
		}
	});
	list.push(`\`Ilość młotów [${list.length}] z takim poziomem\``);

	return list.join("\n");
}

function mentionAttribute(mention) {
	let onlyID = mention.replace(/[<>@]/g, "");
	const objectArray = read();
	const playerIndex = objectArray.findIndex((o) => o.discordID === onlyID);

	if (playerIndex === -1) {
		return "Nie ma takiej osoby";
	} else {
		return `[${objectArray[playerIndex].lvl}] ${objectArray[playerIndex].name} \`DiscordID: ${objectArray[playerIndex].discordID}\``;
	}
}

function nameAttribute(name) {
	const objectArray = read();
	const playerIndex = objectArray.findIndex(
		(o) => o.name.toLowerCase() === name
	);

	if (playerIndex === -1) {
		return "Nie ma takiej osoby";
	} else {
		return `[${objectArray[playerIndex].lvl}] ${objectArray[playerIndex].name} \`DiscordID: ${objectArray[playerIndex].discordID}\``;
	}
}


// Add Command
function addToDatabase(playerName, playerLvl, onlyID){
    const objectArray = read();
    const playerNM = objectArray.findIndex((o) => o.name.toLowerCase() === playerName);
    console.log(`${playerNM} : ${playerName}`)
    const playerID = objectArray.findIndex((o) => o.discordID === onlyID);
    console.log(`${playerID} : ${onlyID}`)
    
    if (playerNM < 0 && playerID < 0) {
        objectArray.push({
            name: playerName,
            lvl: parseInt(playerLvl),
            discordID: onlyID
        });
    } else {
        return "już jest taka osoba"
    }

	if (write(objectArray)) {
		return `Dodano \`${playerName}\`a 🫡`;
	} else {
		return "Nie udało się, poproś Aleksa, żeby naprawił";
	}
}

// remove Command
function removeFromDatabase(playerName){
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


module.exports = {
	undefinedAttribute,
	levelAttribute,
	mentionAttribute,
	nameAttribute,
    addToDatabase,
    removeFromDatabase,
};
