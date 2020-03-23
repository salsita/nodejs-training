const onlyRows = require("@salsita/psql/utils/onlyRows");
const onlyFirstRow = require("@salsita/psql/utils/onlyFirstRow");
const quote = require("@salsita/psql/utils/quote");
const squel = require("../squel");

const findAll = onlyRows((dbClient) =>
  dbClient.query(squel.select().from('"Users"').toParam())
);

const findById = onlyFirstRow((dbClient, id) =>
  dbClient.query(
    squel.select().from('"Users"').where('"userId" = ?', id).toParam()
  )
);

const findByLogin = onlyFirstRow((dbClient, id) =>
  dbClient.query(
    squel.select().from('"Users"').where('"login" = ?', id).toParam()
  )
);

const insert = onlyFirstRow((dbClient, data) =>
  dbClient.query(
    squel
      .insert()
      .into('"Users"')
      .setFields(quote(data))
      .returning("*")
      .toParam()
  )
);

const updateById = onlyFirstRow((dbClient, id, data) =>
  dbClient.query(
    squel
      .update()
      .table('"Users"')
      .setFields(quote(data))
      .where('"userId" = ?', id)
      .returning("*")
      .toParam()
  )
);

const removeById = onlyFirstRow((dbClient, id) =>
  dbClient.query(
    squel
      .remove()
      .from('"Users"')
      .where('"userId" = ?', id)
      .returning("*")
      .toParam()
  )
);

const findOrCreateFromProfile = async (
  dbClient,
  serviceName,
  identifier,
  firstName,
  lastName,
  email
) => {
  const identifierColumnName = `${serviceName}Identifier`;
  const {
    rows: [user],
  } = await dbClient.query(
    squel
      .select()
      .from('"Users"')
      .where(`"${identifierColumnName}" = ?`, identifier)
      .toParam()
  );
  if (user) {
    return user;
  }
  const {
    rows: [newUser],
  } = await dbClient.query(
    squel
      .insert()
      .into('"Users"')
      .setFields(
        quote({
          [identifierColumnName]: identifier,
          firstName,
          lastName,
          email,
        })
      )
      .returning("*")
      .toParam()
  );
  return newUser;
};

module.exports = {
  findAll,
  findById,
  findByLogin,
  insert,
  updateById,
  removeById,
  findOrCreateFromProfile,
};
