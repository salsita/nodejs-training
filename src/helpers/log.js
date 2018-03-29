const winston = require("winston");
const util = require("util");
const isProduction = require("./isProduction");
const config = require("../config");
const pruneValues = require("../helpers/pruneValues");

const { log: logOptions } = config;
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
  ...logOptions,
  timestamp: true
});

const log = (level, ...message) => winston.log(level, util.format(...message));

const getError = err =>
  typeof err !== "object"
    ? err
    : pruneValues({
        ...err,
        message: err.message,
        code: err.code,
        stack: err.stack
      });

const getErrorForClient = err =>
  isProduction
    ? err.message || "Ooops something went wrong"
    : JSON.stringify(getError(err));

module.exports = {
  log,
  getError,
  getErrorForClient
};
