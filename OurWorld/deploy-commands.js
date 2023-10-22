// Note: What exactly are best practices or typical conventions for listing all the modules?
// This just seems so unorganized!
const fs = require('node:fs');
const { Client, Intents } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, token } = require('./config.json');
const Winchalk = require('./lib/winchalk.js');

// Create client.
// Note: Look into what exactly each intent does, see next note.
const client = new Client(
	{ intents: [Intents.FLAGS.GUILDS] }
)

// Collect commands from commands folder.
const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

// Go online to register guilds.
client.on('ready', async client => {
	Winchalk.start(`Online at ${client.user.tag}!`);
	Winchalk.info(`Preparing to deploy...`);

	// Collect guilds and guild ids.
	const guilds = client.guilds.cache
	const guildIds = []

	Winchalk.info('Deploying to guilds:');
	guilds.forEach(guild => {
		Winchalk.info(`\t ${guild.id}, ${guild.name}`);
		guildIds.push(guild.id);
	});

	// Register all commands to each guildId.
	const rest = new REST({ version: '9' }).setToken(token);

	for (let i = 0; i < guildIds.length; i++) {
		let registerProm = await new Promise((resolve, reject) => {
			rest.put(Routes.applicationGuildCommands(clientId, guildIds[i]), { body: commands })
				.then(() => {
					Winchalk.info(`Successfully registered commands for guild ${guildIds[i]}.`);
					resolve();
				})
				.catch(error => {
					// I don't know how or why this would ever be called unless there
					// was some sort of invite link with incorrect permissions floating around.
					// Note: Do a little research into this!
					Winchalk.error(`A critical error has occured and RPBot can
						not register commands for  ${guildIds[i]}.`);
					reject(error);
				});
		});

	}

	// Close connection.
	Winchalk.connection('Completed command registration.');
	process.exit(0);
});

// Login.
client.login(token);