import { Server } from 'http';
import express from 'express';
import { PORT } from './configs/config';
import { authorizationMiddleware } from './middlewares/authorization.middleware';
import { errorMiddleware } from './middlewares/error.middleware';
import { mikroOrmRequestContextMiddleware } from './middlewares/mikroOrmRequestContext.middleware';
import { productRouter } from './routes/product.route';
import { cartRouter } from './routes/cart.route';

let server: Server;

function initExpress() {
  const app = express();
  app.use(express.json());
  app.use(mikroOrmRequestContextMiddleware);
  app.use(authorizationMiddleware);
  app.use('/api', productRouter);
  app.use('/api', cartRouter);
  app.use(errorMiddleware);

  return app;
}

export function createServer() {
  return new Promise<void>((res, rej) => {
    const app = initExpress();

    server = app.listen(PORT, () => {
      console.log(`HTTP server created and running on port ${PORT}.`);
      res();
    });
    server.on('error', (err) => {
      console.error(`Error creating server: ${err}.`);
      rej(err);
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
        console.error(`Error closing HTTP server: ${err}.`);
      } else {
        console.log('HTTP server closed.');
      }

      res();
    });
  });
}
