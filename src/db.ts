import mongoose from 'mongoose';
import { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } from './configs/config';

export async function createDBConnection() {
  try {
    await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}`, {
      dbName: DB_NAME,
      user: DB_USERNAME,
      pass: DB_PASSWORD,
    });
    console.log('DB connection created.');
  } catch (err) {
    console.error(`Error creating DB connection: ${err}.`);
    throw err;
  }
}

export async function closeDBConnection() {
  try {
    if (mongoose.connection.readyState !== mongoose.ConnectionStates.connected) {
      return;
    }

    await mongoose.connection.close();
    console.log('DB connction closed.');
  } catch (err) {
    console.error(`Error closing DB connection: ${err}.`);
  }
}
