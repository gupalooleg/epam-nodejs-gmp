import { APP_TERMINATION_DELAY } from './configs/config';
import { closeDBConnection, createDBConnection } from './db';
import { createServer, closeServer } from './server';
import { logger } from './utils/logger';

async function closeApp(code: number) {
  setTimeout(() => {
    logger.warn(`Force termination of the app after ${APP_TERMINATION_DELAY} ms delay.`);
    process.exit(1);
  }, APP_TERMINATION_DELAY);

  try {
    await closeServer();
    await closeDBConnection();

    logger.info('App closed.');
    process.exit(code);
  } catch (err) {
    logger.warn('Force termination of the app after an error during closing.');
    process.exit(1);
  }
}

['SIGINT', 'SIGTERM'].forEach((event) => {
  process.on(event, () => {
    logger.warn(`Signal ${event}.`);
    closeApp(0);
  });
});

['uncaughtException', 'unhandledRejection'].forEach((event) => {
  process.on(event, (err) => {
    logger.error(`Event ${event}: ${err}.`);
    closeApp(1);
  });
});

async function startApp() {
  try {
    await createDBConnection();
    await createServer();

    logger.info('App started.');
  } catch (err) {
    closeApp(1);
  }
}

startApp();
