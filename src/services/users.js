const _ = require("lodash");
const { connect: connectDB, usersModel, userSkillsModel } = require("../db");
const { transaction } = require("@salsita/psql");
const pruneValues = require("@salsita/prune-values");
const { NotFoundError } = require("@salsita/errors");
const uniqConstraintCatch = require("../helpers/uniqConstraintCatch");

const uniqEmailConstraint = "idx_user_email_uniq";

const create = uniqConstraintCatch(
  {
    [uniqEmailConstraint]: "User email is not unique"
  },
  (user, skillIds) =>
    connectDB(
      transaction(async dbClient => {
        const createdUser = await usersModel.insert(
          dbClient,
          pruneValues(user)
        );
        const createdUserSkills = await userSkillsModel.insertForUser(
          dbClient,
          createdUser.userId,
          _.uniq(skillIds)
        );
        return {
          user: createdUser,
          userSkills: createdUserSkills
        };
      })
    )
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
  const toInsert = newSkillIds.filter(
    skillId => !oldSkillIds.includes(skillId)
  );

  return Promise.all([
    userSkillsModel.removeByIds(dbClient, toDelete),
    userSkillsModel.insertForUser(dbClient, id, toInsert)
  ]);
};

const patch = uniqConstraintCatch(
  {
    [uniqEmailConstraint]: "User email is not unique"
  },
  (id, user, skillIds) =>
    connectDB(
      transaction(async dbClient => {
        const valuesToUpdate = pruneValues(user);
        const updatedUser = _.isEmpty(valuesToUpdate)
          ? await usersModel.findById(dbClient, id)
          : await usersModel.updateById(dbClient, id, valuesToUpdate);
        if (!updatedUser) {
          throw new NotFoundError("User not found");
        }
        const updatedUserSkills = updateUserSkills(
          dbClient,
          id,
          _.uniq(skillIds)
        );
        return {
          user: updatedUser,
          userSkills: updatedUserSkills
        };
      })
    )
);

module.exports = {
  create,
  patch
};
