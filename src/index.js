const passport = require("koa-passport");

const log = require("./helpers/log");
const { app, createServer, start, addRoutes, shutdown } = require("./web");
const { connect: connectDB } = require("./db");
const config = require("./config");
const actions = require("./actions");

const { port } = config;

process.on("unhandledRejection", (reason, p) => {
  log("error", "Unhandled Rejection at: Promise", p, "reason:", reason);
  process.exit(1);
});

process.on("uncaughtException", err => {
  log("error", "Uncaught Exception:", err);
  process.exit(1);
});

(async () => {
  // test DB connection and return it to pool
  try {
    await connectDB(() => null);
  } catch (err) {
    log("error", "Can't connect to DB", err);
    process.exit(1);
  }

  const server = await createServer();

  process.on("SIGINT", () => {
    log("info", "Got SIGINT (aka ctrl-c in docker). Graceful shutdown ");
    shutdown(server);
  });

  process.on("SIGTERM", () => {
    log("info", "Got SIGTERM (docker container stop). Graceful shutdown ");
    shutdown(server);
  });

  app.use(passport.initialize());
  addRoutes(actions, "./client");
  start(server, port);
})();
