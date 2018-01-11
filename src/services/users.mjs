import _ from 'lodash';
import connectDB, { transaction, usersModel, userSkillsModel } from '../db';
import pruneValues from '../helpers/pruneValues';
import uniqConstraintCatch from '../helpers/uniqConstraintCatch';
import NotFoundError from '../errors/NotFoundError';

const uniqEmailConstraint = 'idx_user_email_uniq';

export const create = uniqConstraintCatch(
  {
    [uniqEmailConstraint]: 'User email is not unique',
  },
  (user, skillIds) =>
    connectDB(transaction(async (dbClient) => {
      const createdUser = await usersModel.insert(dbClient, pruneValues(user));
      const createdUserSkills = await userSkillsModel
        .insertForUser(dbClient, createdUser.userId, _.uniq(skillIds));
      return {
        user: createdUser,
        userSkills: createdUserSkills,
      };
    }))
);

const updateUserSkills = async (dbClient, id, newSkillIds) => {
  if (!newSkillIds) {
    return null;
  }

  const skills = await userSkillsModel.findSkillMappingsForUser(dbClient, id);
  const oldSkillIds = skills.map(({ skillId }) => skillId);
  const toDelete = skills
    .filter(({ skillId }) => !newSkillIds.includes(skillId))
    .map(({ userSkillId }) => userSkillId);
  const toInsert = newSkillIds
    .filter(skillId => !oldSkillIds.includes(skillId));

  return Promise.all([
    userSkillsModel.removeByIds(dbClient, toDelete),
    userSkillsModel.insertForUser(dbClient, id, toInsert),
  ]);
};

export const patch = uniqConstraintCatch(
  {
    [uniqEmailConstraint]: 'User email is not unique',
  },
  (id, user, skillIds) =>
    connectDB(transaction(async (dbClient) => {
      const valuesToUpdate = pruneValues(user);
      const updatedUser = _.isEmpty(valuesToUpdate)
        ? await usersModel.findById(dbClient, id)
        : await usersModel.updateById(dbClient, id, valuesToUpdate);
      if (!updatedUser) {
        throw new NotFoundError('User not found');
      }
      const updatedUserSkills = updateUserSkills(dbClient, id, _.uniq(skillIds));
      return {
        user: updatedUser,
        userSkills: updatedUserSkills,
      };
    }))
);
