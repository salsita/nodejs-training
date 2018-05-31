const createWeb = require("@salsita/koa-server");
const {
  connect: { pool }
} = require("../db");
const log = require("../helpers/log");
const actions = require(".");

after(async () => {
  await pool.end();
});

module.exports = (async () => {
  const web = await createWeb({ log });
  web.addRoutes(actions);
  return web;
})();
