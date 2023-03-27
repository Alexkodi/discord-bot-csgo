const { read } = require("./json-handler.js");

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
        return `[${objectArray[playerIndex].lvl}] ${objectArray[playerIndex].name}`;
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
		return `[${objectArray[playerIndex].lvl}] ${objectArray[playerIndex].name}`;
	}
}

module.exports = {
	undefinedAttribute,
	levelAttribute,
	mentionAttribute,
    nameAttribute
};
