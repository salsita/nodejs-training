import pg from 'pg';
import connectDB from './connect';

export default fn => (dbClient, ...args) =>
  (dbClient instanceof pg.Client
    ? fn(dbClient, ...args)
    : connectDB(realDBClient => fn(realDBClient, dbClient, ...args)));
