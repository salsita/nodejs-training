const { app, createWeb } = require("@salsita/koa-server");

const log = require("./helpers/log");
const config = require("./config");

const { ssl, allowUnsecure } = config;

const web = createWeb({
  log,
  ssl,
  allowUnsecure
});

module.exports = { app, ...web };
