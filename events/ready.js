const Winchalk = require('winchalk');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		Winchalk.start(`Online at ${client.user.tag}!`);
	},
};