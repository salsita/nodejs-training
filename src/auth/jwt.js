const create = require("@salsita/koa-jwt-auth");

const { auth } = require("../config");
const { usersModel } = require("../db");

module.exports = create({
  key: auth.jwtKey,
  version: 1,
  createSession: user => user.userId,
  getUserForSession: usersModel.findById
});
