const fs = require("fs");

function read() {
	const jsonContent = fs.readFileSync("./players.json");
	return JSON.parse(jsonContent);
}

function write(jsonWrite) {
	const sorted = jsonWrite.sort((a, b) => (a.lvl < b.lvl ? 1 : -1));
	fs.writeFileSync("./players.json", JSON.stringify(sorted, null, 2));
	return true;
}

module.exports = {
    read,
    write
}