const createWeb = require("../web");
const actions = require(".");

module.exports = (async () => {
  const web = await createWeb();
  web.addRoutes(actions);
  return web;
})();
