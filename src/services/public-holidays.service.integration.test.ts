import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from './public-holidays.service';

const YEAR = 2024;
const COUNTRY = 'GB';

describe('Tests for module "public-holiday" (integration).', () => {
  describe('Tests for function "getListOfPublicHolidays".', () => {
    test('Should return correct list of public holidays.', async () => {
      const publicHolidays = await getListOfPublicHolidays(YEAR, COUNTRY);
      expect(publicHolidays).toBeInstanceOf(Array);
      expect(
        publicHolidays.every((holiday) =>
          ['name', 'date', 'localName'].every((property) => property in holiday),
        ),
      ).toEqual(true);
    });
  });

  describe('Tests for function "checkIfTodayIsPublicHoliday".', () => {
    test('Should return "true/false" if today is public/not public holiday.', async () => {
      const todayIsPublicHoliday = await checkIfTodayIsPublicHoliday(COUNTRY);
      expect(typeof todayIsPublicHoliday === 'boolean').toEqual(true);
    });
  });

  describe('Tests for function "getNextPublicHolidays".', () => {
    test('Should return correct list of next public holidays.', async () => {
      const publicHolidays = await getNextPublicHolidays(COUNTRY);
      expect(publicHolidays).toBeInstanceOf(Array);
      expect(
        publicHolidays.every((holiday) =>
          ['name', 'date', 'localName'].every((property) => property in holiday),
        ),
      ).toEqual(true);
    });
  });
});
