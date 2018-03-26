const { log } = require("./helpers/log");
const createWeb = require("./web");
const { connect: connectDB } = require("./db");
const config = require("./config");
const actions = require("./actions");

const { ssl, allowUnsecure, port } = config;

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

  const { start, addRoutes } = await createWeb(ssl, allowUnsecure);
  addRoutes(actions, "./client");
  start(port);
})();
