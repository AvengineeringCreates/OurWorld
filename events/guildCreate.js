const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const Winchalk = require('winchalk');

module.exports = {
	name: 'guildCreate',
	once: false,
	async execute(guild) {
		Winchalk.info(`OurWorld has joined Guild ${guild.id}, ${guild.name}.`);
		
		// Collect commands from commands folder.
		Winchalk.info(`Reading out commands...`);
		const commands = [];
		const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

		for (const file of commandFiles) {
			const command = require(`../commands/${file}`);
			commands.push(command.data.toJSON());
		}

		// Register all commands to each guildId.
		const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);

		let registerProm = await new Promise((resolve, reject) => {
			rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guild.id), { body: commands })
				.then(() => {
					Winchalk.info(`Successfully registered commands for Guild ${guild.id}, ${guild.name}.`);
					resolve();
				})
				.catch(error => {
					Winchalk.error(`An error has occured and OurWorld can not register commands for  ${guildIds[i]}.`);
					reject(error);
				});
		});

		// Close connection.
		Winchalk.connection('Completed command registration.');
	},
};