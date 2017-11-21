import http from 'http';
import HTTPStatus from 'http-status';
import config from '../config';
import isProduction from '../helpers/isProduction';

const { allowUnsecure } = config;

export const middleware = async (ctx, next) => {
  if (allowUnsecure || !isProduction || (ctx.secure || ctx.header['x-forwarded-proto'] === 'https')) {
    await next();
  } else {
    ctx.redirect(`https://${ctx.get('Host')}${ctx.url}`);
  }
};
export const createServer = () =>
  http.createServer((req, res) => {
    res.writeHead(HTTPStatus.MOVED_PERMANENTLY, { Location: `https://${req.headers.host}${req.url}` });
    res.end();
  });
