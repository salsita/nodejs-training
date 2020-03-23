const onlyRows = require("@salsita/psql/utils/onlyRows");
const squel = require("../squel");

// eslint-disable-next-line import/prefer-default-export
const findAll = onlyRows((dbClient) =>
  dbClient.query(squel.select().from('"Skills"').toParam())
);

module.exports = {
  findAll,
};
