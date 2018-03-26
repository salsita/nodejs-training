const http = require('http');
const HTTPStatus = require('http-status');
const config = require('../config');
const isProduction = require('../helpers/isProduction');

const { allowUnsecure } = config;

module.exports = {
  middleware: async (ctx, next) => {
    if (allowUnsecure || !isProduction || (ctx.secure || ctx.header['x-forwarded-proto'] === 'https')) {
      await next();
    } else {
      ctx.redirect(`https://${ctx.get('Host')}${ctx.url}`);
    }
  },

  createServer: () =>
    http.createServer((req, res) => {
      res.writeHead(HTTPStatus.MOVED_PERMANENTLY, { Location: `https://${req.headers.host}${req.url}` });
      res.end();
    }),
};
