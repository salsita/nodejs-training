const createWeb = require("@salsita/koa-server");
const {
  connect: { pool }
} = require("../db");
const actions = require(".");

after(async () => {
  await pool.end();
});

module.exports = (async () => {
  const web = await createWeb();
  web.addRoutes(actions);
  return web;
})();
