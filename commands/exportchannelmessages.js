const { SlashCommandBuilder } = require('@discordjs/builders');
const { Coglib } = require('../lib/coglib.js');
const fs = require('fs');
const Winchalk = require('winchalk');

module.exports = {
	permissions: [],
	data: new SlashCommandBuilder()
		.setName('exportchannelmessages')
		.setDescription(`Exports all of a channel's messages to a txt file.`),
	async execute(client, interaction) {
		return interaction.reply("Retrieving content from this channel...").then(() => {
			return Coglib.FetchChannelMessages(interaction.channel);
		}).then((messages) => {
			// Get date.
			let now = Date.now();
			let date = new Date(now).toDateString();

			// Create title.
			var list = "OURWORLD EXPORT VIA DISCORD\n" +
				"SERVER: " + interaction.guild.name + ", ID " + interaction.guild.id + "\n" +
				"CHANNEL: " + interaction.channel.name + ", ID " + interaction.channel.id + "\n" +
				date +
				"---------------------------------------------";

			// Reverse the messages before concatenation.
			messages = messages.reverse();
			// Concatenate all messages into a list.
			messages.forEach((msg) => {
				list = list + '\n(' + msg.author.id + ") " + msg.author.username + ": " + msg.content;
			})

			// Write file.
			let fileName = `./tmp/yourRP-${interaction.guild.id}-${interaction.channel.id}.txt`;

			fs.writeFile(fileName, list, function (err) {
				Winchalk.info("Writing file for guild " + interaction.guild.id + ", channel " + interaction.channel.id + "...");
				if (err) {
					interaction.followUp(`There was an error writing the file. Please contact the bot administrator ${process.env.MAINTAINER_DISCORD} to submit a bug report.`)
					return Winchalk.error(err);
				} else {
					Winchalk.info("File written successfully at `" + fileName + "` !");

					// Send file.
					Winchalk.info("Sending file `" + fileName + "`...");
					interaction.channel.send({
						files: [fileName]
					}).then(() => {
						Winchalk.info("File `" + fileName + "` successfully sent! Deleting file.");
						fs.unlinkSync(fileName);
					}).catch((e) => {
						// ! Needs more specificity, implement error handling for different error types
						fs.unlinkSync(fileName);
						interaction.followUp("There was an error sending the exported messages. Please make sure the bot has proper permissions.");
					});
				}
			});
		}).catch((e) => {
			interaction.followUp({
				content: "There was an error reading the messages in this channel. Please make sure the bot has proper permissions.",
				ephemeral: true
			});
		})
	},
};