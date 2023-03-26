// dotenv for Bot TOKEN
require("dotenv").config();

// "Back-end" for Bot
const app = require("./app/engine.js");

// Disocrd.js
const { Client, Events, GatewayIntentBits, Partials } = require("discord.js");

// Object with Bot intents
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
	partials: [Partials.Channel],
});

// Start info
client.once(Events.ClientReady, (c) => {
	const date = new Date();
	console.log(
		`Start ${c.user.tag} || ${date.toLocaleString("pl-PL", {
			hour12: false,
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		})}`
	);
});

// Prefix for commands
const prefix = "cs ";

// Message create listener
client.on("messageCreate", (message) => {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;

	// Removing prefix and spliting string
	const commandMessage = message.content.slice(prefix.length).toLowerCase();
	const commandArray = commandMessage.split(" ");

	switch (commandArray[0]) {
		// Display whole database
		case "a":
			console.log(commandArray[1]);
			message.channel.send(commandArray[1]);
			break;

		case "db":
			message.channel.send(app.db(commandArray[1]));
			break;

		// Display lvl
		// case "dblvl":
		// 	message.channel.send(app.displayLvl(commandArray[1]));
		// 	break;

		// Add player to database
		case "dbadd":
			if (commandArray[2] == undefined || null) {
				message.channel.send("Nie podałeś lvl debilu");
				return;
			}

			message.channel.send(
				app.addPlayer(commandArray[1], commandArray[2], message.member.roles.cache)
			);
			break;

		// Remove player from database
		case "dbremove":
			if (
				message.member.roles.cache.some(
					(role) => role.name === "CSGOadmin"
				)
			) {
				message.channel.send(app.removePlayer(commandArray[1]));
			} else {
				message.channel.send("Nie masz uprawnien cwaniaczku");
			}
			break;

		// Edit player name
		case "dbname":
			if (
				message.member.roles.cache.some(
					(role) => role.name === "CSGOadmin"
				)
			) {
				message.channel.send(app.changeName(commandArray[1]));
			} else {
				message.channel.send("Nie masz uprawnien cwaniaczku");
			}
			break;

		// Edit player lvl
		case "dblvl":
			if (commandArray[2] == undefined || null) {
				message.channel.send("Nie podałeś lvl debilu");
				return;
			}
			if (
				message.member.roles.cache.some(
					(role) => role.name === "CSGOadmin"
				)
			) {
				message.channel.send(
					app.changeLvl(commandArray[1], commandArray[2])
				);
			} else {
				message.channel.send("Nie masz uprawnien cwaniaczku");
			}
			break;

		case "q":
			message.channel.send(app.displayQueue());
			break;

		case "qadd":
			app.addToQueue(commandArray[1]);
			break;

		case "qr":
			app.removeFromQueue(commandArray[1]);
			break;

		// Help command
		case "help":
			message.channel.send(`help`);
			break;

		default:
			message.channel.send("Nie rozumiem");
	}
});

client.login(process.env.DISCORD_TOKEN);
