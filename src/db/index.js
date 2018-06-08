const _ = require("lodash");
const psql = require("@salsita/psql");

const { db } = require("../config");
const log = require("../helpers/log");

const squel = require("./squel");

const skills = require("./models/skills");
const users = require("./models/users");
const userSkills = require("./models/userSkills");

const connect = psql.connect({ log, options: db });
const withDb = psql.withDb(connect);

module.exports = {
  connect,
  squel,

  skillsModel: _.mapValues(skills, withDb),
  usersModel: _.mapValues(users, withDb),
  userSkillsModel: _.mapValues(userSkills, withDb)
};
