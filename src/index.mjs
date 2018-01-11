import { log } from './helpers/log';
import createWeb from './web';
import connectDB from './db';
import config from './config';

const { ssl, allowUnsecure, port } = config;

process.on('unhandledRejection', (reason, p) => {
  log('error', 'Unhandled Rejection at: Promise', p, 'reason:', reason);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  log('error', 'Uncaught Exception:', err);
  process.exit(1);
});

(async () => {
  // test DB connection and return it to pool
  try {
    await connectDB(() => null);
  } catch (err) {
    log('error', 'Can\'t connect to DB', err);
    process.exit(1);
  }

  const { start } = await createWeb(ssl, allowUnsecure);
  start(port);
})();
