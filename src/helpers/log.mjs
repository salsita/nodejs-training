import winston from 'winston';
import util from 'util';
import isProduction from './isProduction';
import config from '../config';

const { log: logOptions } = config;
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
  ...logOptions,
  timestamp: true,
});

export const log = (level, ...message) =>
  winston.log(level, util.format(...message));

export const getError = (err, asArray = false) => {
  const errString = asArray
    ? '{}'
    : JSON.stringify(err, null, ' ');
  const error = errString !== '{}'
    ? { error: err }
    : { message: err.message, code: err.code };
  if (err.stack) {
    error.stack = err.stack;
  }
  return error;
};

export const getErrorForClient = (err, asArray = false) => (
  isProduction
    ? err.message || 'Ooops something went wrong'
    : getError(err, asArray)
);

export const logError = err =>
  log('error', getError(err));
