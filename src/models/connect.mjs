import url from 'url';
import pg from 'pg';
import config from '../config';

const { db } = config;

// funny thing it does not connect to remote URL without this magic from localhost
// and as a bonus we are using secured connection
const parsedURL = url.parse(db.url || '');
const [user, password] = parsedURL.auth
  ? parsedURL.auth.split(':')
  : [];
const dbOptions = {
  user,
  password,
  database: parsedURL.path && parsedURL.path.substr(1),
  port: parsedURL.port,
  host: parsedURL.hostname,
  ssl: db.secure,
};

pg.defaults.poolSize = db.poolSize;

const pool = new pg.Pool(dbOptions);

export default pool.connect.bind(pool);
