const crypto = require("crypto");
const util = require("util");
const jwt = require("jsonwebtoken");
const { auth } = require("../config");

const pbkdf2 = util.promisify(crypto.pbkdf2);

const HASH_CONFIG_V1 = "v1";
const CURRENT_HASH_CONFIG = HASH_CONFIG_V1;
const SESSION_VERSION = 1;

const algorithm = "HS384";
const expiresIn = "6h";

const HASH_CONFIGS = {
  [HASH_CONFIG_V1]: {
    saltBytes: 32,
    iterations: 100000,
    keylen: 512,
    digest: "sha512"
  }
};

const makeSalt = (version = CURRENT_HASH_CONFIG) => {
  const { saltBytes } = HASH_CONFIGS[version];
  return crypto.randomBytes(saltBytes).toString("base64");
};

const encryptPassword = async (
  password,
  salt64,
  version = CURRENT_HASH_CONFIG
) => {
  const salt = Buffer.from(salt64, "base64");
  const { iterations, keylen, digest } = HASH_CONFIGS[version];
  const key = await pbkdf2(password, salt, iterations, keylen, digest);
  return key.toString("base64");
};

const createSession = user => ({
  version: SESSION_VERSION,
  user: {
    id: user.userId
  }
});

const resignPayload = payload => {
  delete payload.exp; // eslint-disable-line no-param-reassign
  return jwt.sign(payload, auth.jwtKey, { algorithm, expiresIn });
};

const createSessionToken = async user => {
  const payload = await createSession(user);
  return resignPayload(payload);
};

const isSessionValid = session =>
  session && session.version === SESSION_VERSION;

const idFromSession = session => session.user.id;

module.exports = {
  HASH_CONFIG_V1,
  CURRENT_HASH_CONFIG,
  makeSalt,
  encryptPassword,
  algorithm,
  createSession,
  resignPayload,
  createSessionToken,
  isSessionValid,
  idFromSession
};
