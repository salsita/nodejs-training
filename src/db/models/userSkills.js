const squel = require("../squel");
const onlyRows = require("@salsita/psql/utils/onlyRows");
const quote = require("@salsita/psql/utils/quote");

const findAll = onlyRows(dbClient =>
  dbClient.query(
    squel
      .select()
      .from('"UserSkills"')
      .toParam()
  )
);

const findSkillMappingsForUser = onlyRows((dbClient, id) =>
  dbClient.query(
    squel
      .select()
      .field("*")
      .from('"UserSkills"')
      .where('"userId" = ?', id)
      .toParam()
  )
);

const findSkillsForUser = onlyRows((dbClient, id) =>
  dbClient.query(
    squel
      .select()
      .field("s.*")
      .from('"UserSkills"', "us")
      .join('"Skills"', "s", 'us."skillId" = s."skillId"')
      .where('us."userId" = ?', id)
      .toParam()
  )
);

const insertForUser = onlyRows(
  (dbClient, userId, skillIds) =>
    skillIds.length > 0
      ? dbClient.query(
          squel
            .insert()
            .into('"UserSkills"')
            .setFieldsRows(skillIds.map(skillId => quote({ userId, skillId })))
            .returning("*")
            .toParam()
        )
      : {}
);

const removeByIds = onlyRows(
  (dbClient, ids) =>
    ids.length > 0
      ? dbClient.query(
          squel
            .remove()
            .from('"UserSkills"')
            .where('"userSkillId" IN ?', ids)
            .returning("*")
            .toParam()
        )
      : {}
);

module.exports = {
  findAll,
  findSkillMappingsForUser,
  findSkillsForUser,
  insertForUser,
  removeByIds
};
