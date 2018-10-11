const { readFileSync } = require("fs");
const dotenv = require("dotenv");
const toBoolean = require("../helpers/toBoolean");

dotenv.config({ silent: true });

const getEnvValue = val => {
  if (val in process.env) {
    return process.env[val];
  }

  const file = `${val}_FILE`;
  if (file in process.env && process.env[file]) {
    return readFileSync(process.env[file], "utf8");
  }

  return undefined;
};

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

const sslKey = getEnvValue("SSL_KEY");
const sslCert = getEnvValue("CERT_SSL");

const envConfig = {
  apiBase: "/api",
  domain: getEnvValue("DOMAIN"),
  port: getEnvValue("PORT"),
  allowUnsecure: toBoolean(getEnvValue("ALLOW_UNSECURE"), false),
  db: {
    connectionString: getEnvValue("DATABASE_URL"),
    max: parseInt(getEnvValue("POOL_SIZE"), 10) || 20 // limit for free Postgres plan on Heroku
  },
  auth: {
    jwtKey: getEnvValue("JWT_KEY"),
    github: {
      clientID: getEnvValue("GITHUB_CLIENT_ID"),
      clientSecret: getEnvValue("GITHUB_CLIENT_SECRET")
    },
    google: {
      clientID: getEnvValue("GOOGLE_CLIENT_ID"),
      clientSecret: getEnvValue("GOOGLE_CLIENT_SECRET")
    }
  },
  ssl: (sslKey || sslCert) && { key: sslKey, cert: sslCert },
  ...({
    development,
    production,
    test
  }[process.env.NODE_ENV] || development)
};

const required = [
  "apiBase",
  "domain",
  "port",
  "db.connectionString",
  "auth.jwtKey",
  "auth.github.clientID",
  "auth.github.clientSecret",
  "auth.google.clientID",
  "auth.google.clientSecret",
  "log.level",
  "log.colorize"
];

const check = (conf, keyArray) => {
  const [key, ...rest] = keyArray;
  if (conf[key] === undefined) {
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

if (process.env.CI) {
  missing.forEach(longKey => {
    const keyArray = longKey.split(".").reverse();
    let conf = envConfig;
    while (keyArray.length) {
      const key = keyArray.pop();
      if (conf[key] === undefined) {
        conf[key] = keyArray.length ? {} : "CI";
      }
      conf = conf[key];
    }
  });
} else if (missing.length) {
  console.log(`Missing settings: ${missing.join(", ")}`); // eslint-disable-line no-console
  process.exit(1);
}

module.exports = envConfig;
