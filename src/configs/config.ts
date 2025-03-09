import dotenv from 'dotenv';

dotenv.config();

export const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, PORT, TOKEN_KEY } = process.env;
