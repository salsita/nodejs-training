const PrettyError = require("pretty-error");
const config = require("../config");

const {
  log: { colorize },
} = config;

const pe = new PrettyError();
if (!colorize) {
  pe.withoutColors();
}

module.exports = pe.render.bind(pe);
