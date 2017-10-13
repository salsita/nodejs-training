import http from 'http';
import https from 'https';
import fs from 'fs';
import Koa from 'koa';

import morgan from 'koa-morgan';
import cors from 'koa-cors';
import helmet from 'koa-helmet';
import compress from 'koa-compress';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static-server';
import send from 'koa-send';
import { middleware as forceSSL, createServer as createRedirectServer } from './helpers/forceSSL';

import connectDB from './models';
import actions from './actions';

import { log, logError } from './helpers/log';
import config from './config';

const { ssl, allowUnsecure, port } = config;

export default async () => {
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

  // test DB connection and return it to pool
  try {
    const client = await connectDB();
    client.release();
  } catch (err) {
    log('error', 'Can\'t connect to DB', err);
    process.exit(1);
  }

  let server = null;
  if (ssl) {
    const options = {
      /* eslint-disable security/detect-non-literal-fs-filename */
      key: fs.readFileSync(ssl.keyFile),
      cert: fs.readFileSync(ssl.certFile),
      /* eslint-enable security/detect-non-literal-fs-filename */
    };
    server = https.createServer(options, app.callback());
    createRedirectServer();
  } else {
    server = http.createServer(app.callback());
  }

  server.listen(port, (err) => {
    if (err) {
      log('error', err);
    } else {
      log('info', '----');
      log('info', `==> Server is running on port ${port}`);
      log('info', `==> Send requests to http${allowUnsecure ? '' : 's'}://localhost:${port}`);
    }
  });
};
