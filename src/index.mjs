import { log } from './helpers/log';
import web from './web';

process.on('unhandledRejection', (reason, p) => {
  log('error', 'Unhandled Rejection at: Promise', p, 'reason:', reason);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  log('error', 'Uncaught Exception:', err);
  process.exit(1);
});

web();
