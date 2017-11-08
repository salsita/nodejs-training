const tidx = Symbol('transaction id');

async function transaction(dbClient, fn) {
  await dbClient.query('BEGIN');
  try {
    const result = await fn(dbClient);
    await dbClient.query('COMMIT');
    return result;
  } catch (err) {
    await dbClient.query('ROLLBACK');
    throw err;
  }
}

/* eslint-disable security/detect-object-injection */
export default fn => async (dbClient) => {
  if (dbClient[tidx]) {
    await dbClient[tidx];
  }

  dbClient[tidx] = transaction(dbClient, fn); // eslint-disable-line no-param-reassign

  return dbClient[tidx];
};
/* eslint-enable security/detect-object-injection */
