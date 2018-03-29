const util = require("util");
const fs = require("fs");
const dotenv = require("dotenv");
const toBoolean = require("../helpers/toBoolean");

// eslint-disable-next-line security/detect-non-literal-fs-filename
const readFile = util.promisify(fs.readFile);

dotenv.config({ silent: true });

const SSLKey = process.env.SSL_KEY;
const CertSSL = process.env.CERT_SSL;
const SSLKeyFile = process.env.SSL_KEY_FILE;
const CertSSLFile = process.env.CERT_SSL_FILE;

const development = {
  log: {
    level: "debug",
    colorize: true
  }
};

const production = {
  log: {
    level: "info",
    colorize: false
  }
};

const test = {
  log: {
    level: "warn",
    colorize: true
  }
};

const envConfig = {
  apiBase: "/api",
  port: process.env.PORT,
  allowUnsecure: toBoolean(process.env.ALLOW_UNSECURE, false),
  db: {
    connectionString: process.env.DATABASE_URL,
    max: parseInt(process.env.POOL_SIZE, 10) || 20 // limit for free Postgre plan on Heroku
  },
  jwtKey: process.env.JWT_KEY,
  ssl:
    (SSLKey || SSLKeyFile) &&
    (CertSSL || CertSSLFile) &&
    Promise.all([
      SSLKey || readFile(SSLKeyFile, "utf8"),
      CertSSL || readFile(CertSSLFile, "utf8")
    ]).then(([key, cert]) => ({ key, cert })),
  ...({
    development,
    production,
    test
  }[process.env.NODE_ENV] || development)
};

const required = [
  "apiBase",
  "port",
  "db.connectionString",
  "jwtKey",
  "log.level",
  "log.colorize"
];

const check = (conf, keyArray) => {
  const [key, ...rest] = keyArray;
  if (!conf[key]) {
    return false;
  }
  return rest.length ? check(conf[key], rest) : true;
};

const missing = required.reduce((acc, longKey) => {
  const keyArray = longKey.split(".");
  if (!check(envConfig, keyArray)) {
    acc.push(longKey);
  }
  return acc;
}, []);

if (!process.env.CI && missing.length) {
  console.log(`Missing settings: ${missing.join(", ")}`); // eslint-disable-line no-console
  process.exit(1);
}

module.exports = envConfig;
