const http = require('http');
const https = require('https');
const fs = require('fs');
const util = require('util');
const Koa = require('koa');

const morgan = require('koa-morgan');
const cors = require('koa-cors');
const helmet = require('koa-helmet');
const compress = require('koa-compress');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static-server');
const send = require('koa-send');
const { middleware: forceSSL, createServer: createRedirectServer } = require('./helpers/forceSSL');

const actions = require('./actions');

const { log, logError } = require('./helpers/log');

// eslint-disable-next-line security/detect-non-literal-fs-filename
const readFile = util.promisify(fs.readFile);

module.exports = async (ssl, allowUnsecure = !ssl) => {
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
