/* eslint-disable operator-linebreak */
/* eslint-disable no-param-reassign */
import { pipeline } from 'stream';
import { createWriteStream } from 'fs';
import csv from 'csvtojson';

type Data = { [key: string]: string | number };

/**
 * Exports a CSV file to a TXT file.
 * CSV format:
 *  Book;Author;Amount;Price
 *  The Compound Effect;Darren Hardy;5;9,48
 * TXT format: {"book":"The Compound Effect","author":"Darren Hardy","price":9.48}
 * @param {string} csvPath - The path to the source CSV file.
 * @param {string} txtPath - The path to the destination TXT file.
 * @returns {Promise<boolean>} - A promise that resolves to true when export is done.
 */
export const exportCsvToTxt = (csvPath: string, txtPath: string): Promise<boolean> => {
  console.log(`csvPath = ${csvPath}, txtPath = ${txtPath}`);

  return new Promise((resolve, reject) => {
    const csvStream = csv({ delimiter: ';' })
      .fromFile(csvPath)
      .subscribe((data: Data) => {
        Object.entries(data).forEach(([key, value]) => {
          if (key !== 'Amount') {
            data[key.toLowerCase()] =
              key === 'Price' && typeof value === 'string'
                ? Number(value.replace(',', '.'))
                : value;
          }

          delete data[key];
        });
      });
    const writableStream = createWriteStream(txtPath);

    pipeline(csvStream, writableStream, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
};
