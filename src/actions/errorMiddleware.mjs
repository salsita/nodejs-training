import HTTPStatus from 'http-status';

import ClientError from '../errors/ClientError';

import isProduction from '../helpers/isProduction';
import { logError } from '../helpers/log';

export default async (ctx, next) => {
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
