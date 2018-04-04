const HTTPStatus = require("http-status");

const ClientError = require("../errors/ClientError");

const { log, getError, getErrorForClient } = require("../helpers/log");

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof ClientError) {
      ctx.status = err.status;
      ctx.body = {
        error: err.message
      };
    } else {
      log("error", "koa request", getError(err));

      ctx.status = HTTPStatus.INTERNAL_SERVER_ERROR;
      ctx.body = {
        error: getErrorForClient(err)
      };
    }
  }
};
