import squel from '../squel';
import { onlyRows } from '../utils/wrap';

// eslint-disable-next-line import/prefer-default-export
export const findAll = onlyRows(
  dbClient => dbClient.query(
    squel
      .select()
      .from('"Skills"')
      .toParam()
  )
);
