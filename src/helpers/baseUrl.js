const { domain, allowUnsecure } = require("../config");

const protocol = `http${allowUnsecure ? "" : "s"}`;
module.exports = `${protocol}://${domain}`;
