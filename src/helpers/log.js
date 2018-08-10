const winston = require("winston");
const util = require("util");
const { getTransactionId } = require("@salsita/koa-server");
const config = require("../config");
const pe = require("./prettyError");

const { log: logOptions } = config;

const logger = winston.createLogger({
  level: logOptions.level,
  format: winston.format.combine(
    ...[
      winston.format.timestamp(),
      logOptions.colorize && winston.format.colorize(),
      winston.format.printf(({ timestamp, level, message }) => {
        const transactionId = getTransactionId();
        return `${timestamp} - ${level} (${transactionId}): ${message}`;
      })
    ].filter(Boolean)
  ),
  transports: [new winston.transports.Console()]
});

module.exports = (level, ...message) => {
  logger.log({
    level,
    message: util.format(...message.map(m => (m instanceof Error ? pe(m) : m)))
  });
};
