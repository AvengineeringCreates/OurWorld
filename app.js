/**
 * OurWorld by Avengineering and Amp!
 * Adapted under the MIT license from code included in the DiscordJS guide.
 * https://github.com/discordjs/guide
 * 
 * Apologies for the insanity. I kind of Frankensteined this from a bunch of different modules.
 * Thank you for being patient with me. :)
 */

// Modules
const fs = require('node:fs');
const Discord = require('discord.js');
const Winchalk = require('winchalk');
const Coglib = require('./lib/coglib.js');

// Get token
//const { token, maintainerDiscord } = require('./config.json');

// Create client
const client = new Discord.Client(
	{ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MEMBERS] }
);

// Load commands
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

// Load events
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// On interaction create
client.on('interactionCreate', async interaction => {
	// Note: should this be isApplicationCommand(), or isCommand() || isContextMenu()?
	if (!interaction.isApplicationCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	// Check for permissions and attempt to execute command.
	try {
		if (interaction.guild.me.permissions.has(command.permissions)) {
			if (interaction.memberPermissions.has(command.permissions)) {
				await command.execute(client, interaction);
			} else {
				await Coglib.ReplyOrEditReply(interaction, {
					content:
						`You do not have permissions to run this command.`,
					embeds: [],
					components: [],
					ephemeral: true
				});
			}
		} else {
			await Coglib.ReplyOrEditReply(interaction, {
				content:
					`I do not have the permissions to run this command.`,
				embeds: [],
				components: [],
				ephemeral: true
			});
		}
	} catch (error) {
		console.error(error);
		await Coglib.ReplyOrEditReply(interaction, {
			content:
				`There was an error executing your command. Please ` +
				`reach out to my supervisor ` + process.env.MAINTAINER_DISCORD + ` via Discord to submit a bug ` +
				`report.`,
			embeds: [],
			components: [],
			ephemeral: true
		});
	}
});

async function initialize() {
	client.login(process.env.BOT_TOKEN).catch((e) => {
		Winchalk.error(`There was a problem initializing OurWorld.`);
	})
}

initialize();