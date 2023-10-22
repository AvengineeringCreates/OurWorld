/**
 * Winchalk by Avengineering
 * A cool module that combines Winston logger and chalk colors.
 */

const Chalk = require('chalk');
const Winston = require('winston');
const logLevels = { critical: 0, error: 1, warn: 2, connection: 3, info: 4, msgin: 5, msgout: 6, start: 7, debug: 8, silly: 9 };

const Winchalk = Winston.createLogger({
	levels: logLevels,
	transports: [new Winston.transports.Console({
		level: "debug",
		levels: logLevels,
		handleExceptions: true,
		colorize: false
	})],
	format: Winston.format.printf(log => {
		switch (log.level) {
			case "critical": return Chalk.black.bgRed(`[${log.level.toUpperCase()}] ${log.message}`); break;
			case "error": return Chalk.black.bgRed(`[${log.level.toUpperCase()}]`) + Chalk.red(` ${log.message}`); break;
			case "warn": return Chalk.black.bgYellow(`[${log.level.toUpperCase()}]`) + Chalk.yellow(` ${log.message}`); break;
			case "connection": return Chalk.black.bgGreen(`[${log.level.toUpperCase()}]`) + Chalk.green(` ${log.message}`); break;
			case "info": return Chalk.black.bgWhite(`[${log.level.toUpperCase()}]`) + Chalk.white(` ${log.message}`); break;
			case "msgin":
			case "msgout": return Chalk.black.bgCyan(`[${log.level.toUpperCase()}]`) + Chalk.cyan(` ${log.message}`); break;
			case "start": return Chalk.black.bgGreenBright(`[${log.level.toUpperCase()}]`) + Chalk.greenBright(` ${log.message}`); break;
			case "debug": return Chalk.black.bgGrey(`[${log.level.toUpperCase()}]`) + Chalk.grey(` ${log.message}`); break;
			case "silly": return Chalk.black.bgMagenta(`[${log.level.toUpperCase()}]`) + Chalk.magenta(` ${log.message}`); break;
		};
	})
});

module.exports = Winchalk;