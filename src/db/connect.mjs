import pg from 'pg';
import util from 'util';
import { log } from '../helpers/log';
import config from '../config';
import DBError from '../errors/DBError';

const isMyQuery = Symbol('isMyQuery');

const injectLogging = (dbClient) => {
  if (!dbClient[isMyQuery]) {
    dbClient[isMyQuery] = true; // eslint-disable-line no-param-reassign
    const originalQuery = dbClient.query.bind(dbClient);
    dbClient.query = async (...args) => { // eslint-disable-line no-param-reassign
      try {
        const start = process.hrtime();
        const result = await originalQuery(...args);
        const end = process.hrtime(start);

        const time = ((end[0] * 1e9) + end[1]) / 1e6;
        const argsFormatted = util.inspect(args);
        log('debug', `${time.toFixed(3)}`, argsFormatted, { rowCount: result.rowCount });
        return result;
      } catch (err) {
        log('error', 'DB', err.stack || err, '\n', args);
        throw new DBError(err);
      }
    };
  }
  return dbClient;
};

const { db } = config;

const pool = new pg.Pool(db);

export default async (fn) => {
  const dbClient = await pool.connect();
  try {
    injectLogging(dbClient);
    return await fn(dbClient);
  } finally {
    dbClient.release();
  }
};
