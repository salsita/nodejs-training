const _ = require('lodash');
const withDb = require('./withDb');

const connect = require('./connect');

const transaction = require('./transaction');
const squel = require('./squel');

const skills = require('./models/skills');
const users = require('./models/users');
const userSkills = require('./models/userSkills');

module.exports = {
  connect,

  transaction,
  squel,

  skillsModel: _.mapValues(skills, withDb),
  usersModel: _.mapValues(users, withDb),
  userSkillsModel: _.mapValues(userSkills, withDb),
};
