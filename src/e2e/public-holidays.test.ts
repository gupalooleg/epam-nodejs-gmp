import request from 'supertest';
import { PUBLIC_HOLIDAYS_API_URL } from '../config';

const YEAR = 2024;

describe('Tests for Nager.Date API (e2e).', () => {
  describe('Tests for endpoint "/PublicHolidays").', () => {
    test('Get list of public holidays for any available country.', async () => {
      const { status: statusAC, body: countries } = await request(PUBLIC_HOLIDAYS_API_URL).get(
        '/AvailableCountries',
      );

      expect(statusAC).toEqual(200);
      expect(countries).toBeInstanceOf(Array);
      expect(countries.length).toBeGreaterThan(0);
      expect(countries[0]).toEqual(
        expect.objectContaining({
          countryCode: expect.any(String),
          name: expect.any(String),
        }),
      );

      const { countryCode } = countries[0];

      const { status: statusPH, body: publicHolidays } = await request(PUBLIC_HOLIDAYS_API_URL).get(
        `/PublicHolidays/${YEAR}/${countryCode}`,
      );

      expect(statusPH).toEqual(200);
      expect(publicHolidays).toBeInstanceOf(Array);
      expect(publicHolidays.length).toBeGreaterThan(0);
      expect(publicHolidays[0]).toEqual(
        expect.objectContaining({
          name: expect.any(String),
          localName: expect.any(String),
          date: expect.any(String),
          countryCode: expect.any(String),
        }),
      );
      expect(publicHolidays[0].countryCode).toEqual(countryCode);
      expect(new Date(publicHolidays[0].date).getFullYear()).toEqual(YEAR);
    });
  });
});
