const winston = require("winston");
const util = require("util");
const config = require("../config");

const { log: logOptions } = config;

const logger = winston.createLogger({
  level: logOptions.level,
  format: winston.format.combine(
    ...[
      winston.format.timestamp(),
      logOptions.colorize && winston.format.colorize(),
      winston.format.printf(
        info => `${info.timestamp} - ${info.level}: ${info.message}`
      )
    ].filter(Boolean)
  ),
  transports: [new winston.transports.Console()]
});

module.exports = (level, ...message) =>
  logger.log({ level, message: util.format(...message) });
