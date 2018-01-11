import _ from 'lodash';
import withDb from './withDb';

import connect from './connect';
import _transaction from './transaction';
import _squel from './squel';

import * as skills from './models/skills';
import * as users from './models/users';
import * as userSkills from './models/userSkills';

export default connect;

export const transaction = _transaction;
export const squel = _squel;

export const skillsModel = _.mapValues(skills, withDb);
export const usersModel = _.mapValues(users, withDb);
export const userSkillsModel = _.mapValues(userSkills, withDb);
