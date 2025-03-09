import { Server } from 'http';
import { Socket } from 'net';
import express from 'express';
import { CONNECTIONS_TERMINATION_DELAY, PORT } from './configs/config';
import { authenticationMiddleware } from './middlewares/authentication.middleware';
import { errorMiddleware } from './middlewares/error.middleware';
import { mikroOrmRequestContextMiddleware } from './middlewares/mikroOrmRequestContext.middleware';
import { productRouter } from './routes/product.route';
import { cartRouter } from './routes/cart.route';
import { authRouter } from './routes/auth.route';
import { healthCheckMiddleware } from './middlewares/healthCheck.middleware';
import { logRequestMiddleware } from './middlewares/logRequest.middleware';
import { logger } from './utils/logger';

let server: Server;
let connections: Socket[] = [];

function initExpress() {
  const app = express();
  app.use(express.json());
  app.use(logRequestMiddleware);
  app.use(mikroOrmRequestContextMiddleware);
  app.use('/health', healthCheckMiddleware);
  app.use('/api', authRouter);
  app.use(authenticationMiddleware);
  app.use('/api', productRouter);
  app.use('/api', cartRouter);
  app.use(errorMiddleware);

  return app;
}

export function createServer() {
  return new Promise<void>((res, rej) => {
    const app = initExpress();

    server = app.listen(PORT, () => {
      logger.info(`HTTP server created and running on port ${PORT}.`);
      res();
    });

    server.on('error', (err) => {
      logger.error(`Error creating server: ${err}.`);
      rej(err);
    });

    server.on('connection', (connection) => {
      connections.push(connection);
      connection.on('close', () => {
        connections = connections.filter((currConnection) => currConnection !== connection);
      });
    });
  });
}

export function closeServer() {
  return new Promise<void>((res, rej) => {
    if (!server) {
      res();
      return;
    }

    server.close((err) => {
      if (err) {
        logger.error(`Error closing HTTP server: ${err}.`);
        rej(err);
      } else {
        logger.info('HTTP server closed.');
        res();
      }
    });

    // I'm not sure this is necessary
    connections.forEach((connection) => connection.end());

    setTimeout(() => {
      logger.warn(
        `Force termination of the all server connections after ${CONNECTIONS_TERMINATION_DELAY} ms delay.`,
      );
      connections.forEach((connection) => connection.destroy());
    }, CONNECTIONS_TERMINATION_DELAY);
  });
}
