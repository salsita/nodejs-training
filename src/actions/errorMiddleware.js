const HTTPStatus = require('http-status');

const ClientError = require('../errors/ClientError');

const isProduction = require('../helpers/isProduction');
const { logError } = require('../helpers/log');

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof ClientError) {
      ctx.status = err.status;
      ctx.body = {
        error: err.message,
      };
    } else {
      logError(err);

      ctx.status = HTTPStatus.INTERNAL_SERVER_ERROR;
      ctx.body = {
        name: err.name,
        error: err.message,
        stack: isProduction
          ? undefined
          : err.stack,
      };
    }
  }
};
