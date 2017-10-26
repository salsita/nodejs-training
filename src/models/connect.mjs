import pg from 'pg';
import config from '../config';

const { db } = config;

const pool = new pg.Pool(db);

export default async (fn) => {
  const dbClient = await pool.connect();
  try {
    return await fn(dbClient);
  } finally {
    dbClient.release();
  }
};
