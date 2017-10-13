import fs from 'fs';
import dotenv from 'dotenv';
import toBoolean from '../helpers/toBoolean';

dotenv.config({ silent: true });

let SSLKeyFile = process.env.SSL_KEY_FILE;
if (!SSLKeyFile && process.env.SSL_KEY) {
  SSLKeyFile = './manger.key';
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  fs.writeFileSync(SSLKeyFile, process.env.SSL_KEY);
}
let CertSSLFile = process.env.CERT_SSL_FILE;
if (!CertSSLFile && process.env.CERT_SSL) {
  CertSSLFile = './manger.crt';
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  fs.writeFileSync(CertSSLFile, process.env.CERT_SSL);
}

const development = {
  log: {
    level: 'debug',
    colorize: true,
  },
};

const production = {
  log: {
    level: 'info',
    colorize: false,
  },
};

const envConfig = {
  apiBase: '/api',
  port: process.env.PORT,
  allowUnsecure: toBoolean(process.env.ALLOW_UNSECURE, false),
  db: {
    url: process.env.DATABASE_URL,
    secure: toBoolean(process.env.SECURE_DATABASE, true),
    poolSize: parseInt(process.env.POOL_SIZE, 10) || 20, // limit for free Postgre plan on Heroku,
  },
  jwtKey: process.env.JWT_KEY,
  ssl: SSLKeyFile && CertSSLFile && {
    keyFile: SSLKeyFile,
    certFile: CertSSLFile,
  },
  ...(
    {
      development,
      production,
    }[process.env.NODE_ENV] || development
  ),
};

const required = [
  'apiBase',
  'port',
  'db.url',
  'jwtKey',
  'log.level',
  'log.colorize',
];

/* eslint-disable security/detect-object-injection */
const check = (conf, keyArray) => {
  const [key, ...rest] = keyArray;
  if (!conf[key]) {
    return false;
  }
  return rest.length
    ? check(conf[key], rest)
    : true;
};
/* eslint-enable security/detect-object-injection */

const missing = required.reduce(
  (acc, longKey) => {
    const keyArray = longKey.split('.');
    if (!check(envConfig, keyArray)) {
      acc.push(longKey);
    }
    return acc;
  }
  ,
  []
);

if (!process.env.CI && missing.length) {
  console.log(`Missing settings: ${missing.join(', ')}`); // eslint-disable-line no-console
  process.exit(1);
}

export default envConfig;
