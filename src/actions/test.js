const { createWeb } = require("@salsita/koa-server");
const log = require("../helpers/log");
const {
  connect: { pool }
} = require("../db");
const actions = require(".");

after(async () => {
  await pool.end();
});

const { addRoutes, createServer } = createWeb(log);
addRoutes(actions);

const serverPromise = createServer();

module.exports = () => serverPromise;
