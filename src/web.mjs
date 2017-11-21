import http from 'http';
import https from 'https';
import fs from 'fs';
import util from 'util';
import Koa from 'koa';

import morgan from 'koa-morgan';
import cors from 'koa-cors';
import helmet from 'koa-helmet';
import compress from 'koa-compress';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static-server';
import send from 'koa-send';
import { middleware as forceSSL, createServer as createRedirectServer } from './helpers/forceSSL';

import actions from './actions';

import { log, logError } from './helpers/log';

// eslint-disable-next-line security/detect-non-literal-fs-filename
const readFile = util.promisify(fs.readFile);

export default async (ssl, allowUnsecure = !ssl) => {
  const app = new Koa();

  app.on('error', logError);

  // configure server - headers, logging, etc.
  app.use(morgan(':date[iso] - web: :method :url :status :res[content-length] - :response-time ms'));
  app.use(forceSSL);
  app.use(cors());
  app.use(helmet());
  app.use(compress());
  app.use(bodyParser());

  // api routes
  app.use(actions.routes());
  app.use(actions.allowedMethods());

  // static assets
  const s = serve({ rootDir: './client' });
  app.use(async (ctx, next) => {
    try {
      await s(ctx, next);
    } catch (err) {
      await next();
    }
  });
  // otherwise send index
  app.use(async (ctx) => {
    await send(ctx, './client/index.html');
  });

  if (!ssl !== allowUnsecure) {
    log('warn', 'Probably misconfigured server');
  }

  const [key, cert] = ssl
    ? await Promise.all([
      readFile(ssl.keyFile),
      readFile(ssl.certFile),
    ])
    : [];
  const server = ssl
    ? https.createServer({ key, cert }, app.callback())
    : http.createServer(app.callback());

  return {
    app,
    server,
    start: (port) => {
      server.listen(port, (err) => {
        if (err) {
          log('error', err);
        } else {
          log('info', '----');
          log('info', `==> Server is running on port ${port}`);
          log('info', `==> Send requests to http${allowUnsecure ? '' : 's'}://localhost:${port}`);
        }
      });
      if (ssl && port == 443) { // eslint-disable-line eqeqeq
        createRedirectServer().listen(80);
      }
    },
  };
};
