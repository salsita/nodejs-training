const squel = require('../squel');
const { onlyRows } = require('../utils/wrap');

// eslint-disable-next-line import/prefer-default-export
const findAll = onlyRows(
  dbClient => dbClient.query(
    squel
      .select()
      .from('"Skills"')
      .toParam()
  )
);

module.exports = {
  findAll,
};
