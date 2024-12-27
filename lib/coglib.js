/**
 * Coglib by Avengineering
 * An unfinished Discord bot library. ;)
 */

// ! I do not know how to use JSDoc so I tried my best to sort of get started.

const { Message, MessageButton, MessageActionRow } = require('discord.js');

const Winchalk = require('winchalk');

// const TinyForest = require('tiny-forest'); // Not needed yet but will be for branching installation sequences.

// This literally only exists so that a promise timeouts to null does not get confused
// with a regular function that happens to also return null.
class Timeout { }

// ! Should the functions take the IDs of Members and Guilds or actual objects?

let Coglib = {
	CheckErrorType(error, typeName) {
		// The if statement to check if the object is of constructor name "Timeout" was getting
		// a little bit complicated, so I decided just to make it a function.
		let isTimeout = (function (object) {
			if (object !== null) {
				if (object.constructor) {
					if (object.constructor.name == typeName) return true;
					else return false;
				} else return false;
			} else return false;
		})(result);
	},
	ReplyOrEditReply: async function (interaction, settings) {
		if (interaction.replied) {
			return interaction.editReply(settings);
		} else return interaction.reply(settings);
	},
	AskQuestion: async function (interaction, interactionResponse, timeout) {
		let queryMessage = await interactionResponse;

		let filter = (buttonInteraction) => {
			return buttonInteraction.message.id === queryMessage.id
				&& interaction.user.id === buttonInteraction.user.id;
		};

		let collector = interaction.channel.createMessageComponentCollector({
			filter,
			max: 1,
			time: timeout
		});

		return new Promise((resolve, reject) => {
			collector.on('end', async collection => {
				// Note: Is there a way I can combined these two if statements into one?
				if (collection.first()) {
					if (collection.first().customId) { resolve(collection.first().customId); }
				}
				else {
					resolve(new Timeout());
				}
			})
		});
	},
	/**
	 * Fetches the last 100 messages from each channel.
	 * @async @function
	 * @param {Guild} guild The target Guild.
	 * @returns {Promise} Promise resolves when all messages have been fetched.
	 */
	FetchRecentMessages: function (guild) {
		let channelPromises = [];
		guild.channels.cache.forEach(ch => {
			if (ch.type === 'GUILD_TEXT') {
				channelPromises.push(ch.messages.fetch({ limit: 100 }));
			} else return;
		})
		return Promise.all(channelPromises);
	},
	FetchChannelMessages: async function (channel) {
		let channelMessages = await channel.messages.fetch({ limit: 100 });
		let messages = channelMessages;

		Winchalk.info("Collecting messages...");
		while (channelMessages.size > 0) {
			channelMessages = await channel.messages.fetch({
				limit: 100,
				before: channelMessages.last().id,
			});
			messages = messages.concat(channelMessages);
		}

		return messages;
	},
	/** 
	 * Deletes a given member's messages from the 100 most recent messages in each
	 * channel.
	 * @async @function
	 * @param {Guild} guild The Guild where the target member is located.
	 * @param {number} memberId The ID of the target member.
	 * @returns {Promise} Promise resolves when all messages have been deleted.
	 */
	DeleteRecentMemberMessages: async function (guild, memberId) {
		let deletePromises = [];
		let fetchedMessages = await this.FetchRecentMessages(guild)
		for (let i = 0; i < fetchedMessages.length; i++) {
			let userMessages = [];
			fetchedMessages[i].filter(message => message.author.id === memberId)
				.forEach(message => userMessages.push(message))
			if (userMessages[0]) {
				deletePromises.push(guild.channels.fetch(userMessages[0].channelId)
					.then(channel => channel.bulkDelete(userMessages, true))
					.finally(deletedMessages => { return deletedMessages; })
				);
			}
		}
		return Promise.all(deletePromises);
	}
}

module.exports = { Coglib };