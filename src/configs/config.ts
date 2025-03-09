import dotenv from 'dotenv';

dotenv.config();

const { DB_USERNAME } = process.env;
const { DB_PASSWORD } = process.env;
const { DB_HOST } = process.env;
const DB_PORT = Number(process.env.DB_PORT);
const { DB_NAME } = process.env;
const PORT = Number(process.env.PORT);
const { TOKEN_KEY } = process.env;
const { NODE_ENV } = process.env;
const APP_TERMINATION_DELAY = Number(process.env.APP_TERMINATION_DELAY);
const CONNECTIONS_TERMINATION_DELAY = Number(process.env.CONNECTIONS_TERMINATION_DELAY);
const LOG_LEVEL = process.env.NODE_ENV === 'production' ? 'info' : 'debug';

export {
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  PORT,
  TOKEN_KEY,
  NODE_ENV,
  APP_TERMINATION_DELAY,
  CONNECTIONS_TERMINATION_DELAY,
  LOG_LEVEL,
};
