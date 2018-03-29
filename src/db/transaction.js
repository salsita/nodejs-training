const tidx = Symbol("transaction id");

async function transaction(dbClient, fn) {
  await dbClient.query("BEGIN");
  try {
    const result = await fn(dbClient);
    await dbClient.query("COMMIT");
    return result;
  } catch (err) {
    await dbClient.query("ROLLBACK");
    throw err;
  }
}

module.exports = fn => async dbClient => {
  if (dbClient[tidx]) {
    try {
      await dbClient[tidx];
    } catch (err) {
      // we do not care for previous result
    }
  }

  dbClient[tidx] = transaction(dbClient, fn); // eslint-disable-line no-param-reassign

  return dbClient[tidx];
};
