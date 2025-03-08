import { createServer, closeServer } from './server';
import { createDBConnection, closeDBConnection } from './db';

async function closeApp(code: number) {
  await closeServer();
  await closeDBConnection();

  process.exit(code);
}

['SIGINT', 'SIGTERM'].forEach((event) => {
  process.on(event, () => {
    console.error(`${event}.`);
    closeApp(0);
  });
});

['uncaughtException', 'unhandledRejection'].forEach((event) => {
  process.on(event, (err) => {
    console.error(`${event}: ${err}.`);
    closeApp(1);
  });
});

async function startApp() {
  try {
    await createDBConnection();
    await createServer();
  } catch (err) {
    closeApp(1);
  }
}

startApp();
