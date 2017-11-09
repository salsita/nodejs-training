import squel from '../squel';
import { onlyRows, onlyFirstRow } from '../utils/wrap';
import quote from '../utils/quote';

export const findAll = onlyRows(
  dbClient => dbClient.query(
    squel
      .select()
      .from('"Users"')
      .toParam()
  )
);

export const findById = onlyFirstRow(
  (dbClient, id) => dbClient.query(
    squel
      .select()
      .from('"Users"')
      .where('"userId" = ?', id)
      .toParam()
  )
);

export const insert = onlyFirstRow(
  (dbClient, data) => dbClient.query(
    squel
      .insert()
      .into('"Users"')
      .setFields(quote(data))
      .returning('*')
      .toParam()
  )
);

export const updateById = onlyFirstRow(
  (dbClient, id, data) => dbClient.query(
    squel
      .update()
      .table('"Users"')
      .setFields(quote(data))
      .where('"userId" = ?', id)
      .returning('*')
      .toParam()
  )
);

export const removeById = onlyFirstRow(
  (dbClient, id) => dbClient.query(
    squel
      .remove()
      .from('"Users"')
      .where('"userId" = ?', id)
      .returning('*')
      .toParam()
  )
);
