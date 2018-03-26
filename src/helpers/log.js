const winston = require("winston");
const util = require("util");
const isProduction = require("./isProduction");
const config = require("../config");

const { log: logOptions } = config;
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
  ...logOptions,
  timestamp: true
});

const log = (level, ...message) => winston.log(level, util.format(...message));

const getError = (err, asArray = false) => {
  const errString = asArray ? "{}" : JSON.stringify(err, null, " ");
  const error =
    errString !== "{}"
      ? { error: err }
      : { message: err.message, code: err.code };
  if (err.stack) {
    error.stack = err.stack;
  }
  return error;
};

const getErrorForClient = (err, asArray = false) =>
  isProduction
    ? err.message || "Ooops something went wrong"
    : getError(err, asArray);

module.exports = {
  log,
  getError,
  getErrorForClient
};
