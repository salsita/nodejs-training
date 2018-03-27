const http = require("http");
const https = require("https");
const Koa = require("koa");

const morgan = require("koa-morgan");
const cors = require("koa-cors");
const helmet = require("koa-helmet");
const compress = require("koa-compress");
const bodyParser = require("koa-bodyparser");
const serve = require("koa-static");
const send = require("koa-send");
const {
  middleware: forceSSL,
  createServer: createRedirectServer
} = require("./helpers/forceSSL");

const { log, getError } = require("./helpers/log");

module.exports = async (ssl, allowUnsecure = !ssl) => {
  const app = new Koa();

  app.on("error", err => log("error", "koa", getError(err)));

  // configure server - headers, logging, etc.
  app.use(
    morgan(
      ":date[iso] - web: :method :url :status :res[content-length] - :response-time ms"
    )
  );
  app.use(forceSSL);
  app.use(cors());
  app.use(helmet());
  app.use(compress());
  app.use(bodyParser());

  if (!ssl !== allowUnsecure) {
    log("warn", "Probably misconfigured server");
  }

  const server = ssl
    ? https.createServer(await ssl, app.callback())
    : http.createServer(app.callback());

  return {
    app,
    server,
    addRoutes: (actions, distDir) => {
      // api routes
      app.use(actions.routes());
      app.use(actions.allowedMethods());

      if (distDir) {
        // static assets
        app.use(serve(distDir));
        // otherwise send index
        app.use(ctx => send(ctx, `${distDir}/index.html`));
      }
    },
    start: port => {
      if (!port) {
        throw new Error("No port specified");
      }
      server.listen(port, err => {
        if (err) {
          log("error", err);
          process.exit(1);
        } else {
          const protocol = `http${allowUnsecure ? "" : "s"}`;
          log("info", "----");
          log("info", `==> Server is running on port ${port}`);
          log("info", `==> Send requests to ${protocol}://localhost:${port}`);
        }
      });
      // eslint-disable-next-line eqeqeq
      if (ssl && port == 443) {
        createRedirectServer().listen(80);
      }
    }
  };
};
