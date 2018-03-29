const squel = require("../squel");
const { onlyRows, onlyFirstRow } = require("../utils/wrap");
const quote = require("../utils/quote");

const findAll = onlyRows(dbClient =>
  dbClient.query(
    squel
      .select()
      .from('"Users"')
      .toParam()
  )
);

const findById = onlyFirstRow((dbClient, id) =>
  dbClient.query(
    squel
      .select()
      .from('"Users"')
      .where('"userId" = ?', id)
      .toParam()
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

module.exports = {
  findAll,
  findById,
  insert,
  updateById,
  removeById
};
