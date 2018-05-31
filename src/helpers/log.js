const winston = require("winston");
const util = require("util");
const config = require("../config");

const { log: logOptions } = config;
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
  ...logOptions,
  timestamp: true
});

module.exports = (level, ...message) =>
  winston.log(level, util.format(...message));
