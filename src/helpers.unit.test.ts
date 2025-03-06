import { validateInput, shortenPublicHoliday } from './helpers';
import { PublicHoliday, PublicHolidayShort } from './types';

const PUBLIC_HOLIDAY: PublicHoliday = {
  date: '2024-01-01',
  localName: "New Year's Day",
  name: "New Year's Day",
  countryCode: 'GB',
  fixed: false,
  global: false,
  counties: null,
  launchYear: null,
  types: ['Public'],
};
const PUBLIC_HOLIDAY_SHORT: PublicHolidayShort = {
  date: PUBLIC_HOLIDAY.date,
  localName: PUBLIC_HOLIDAY.localName,
  name: PUBLIC_HOLIDAY.name,
};
const SUPPORTED_COUNTRY = 'GB';
const NOT_SUPPORTED_COUNTRY = 'BY';
const CURRENT_YEAR = new Date().getFullYear();
const NOT_CURRENT_YEAR = CURRENT_YEAR - 1;

describe('Tests for module "helpers".', () => {
  describe('Tests for function "shortenPublicHoliday".', () => {
    test('Should return short public holiday data.', () => {
      const shortPublicHoliday = shortenPublicHoliday(PUBLIC_HOLIDAY);
      expect(shortPublicHoliday).toEqual(PUBLIC_HOLIDAY_SHORT);
    });
  });

  describe('Tests for function "validateInput".', () => {
    test('Should return Error if provided country is not supported.', () => {
      const input = { country: NOT_SUPPORTED_COUNTRY, year: CURRENT_YEAR };
      expect(() => validateInput(input)).toThrow(
        new Error(`Country provided is not supported, received: ${NOT_SUPPORTED_COUNTRY}`),
      );
    });

    test('Should return Error if provided year is not current.', () => {
      const input = { country: SUPPORTED_COUNTRY, year: NOT_CURRENT_YEAR };
      expect(() => validateInput(input)).toThrow(
        new Error(`Year provided not the current, received: ${NOT_CURRENT_YEAR}`),
      );
    });

    test('Should return "true" if country is supported and year is current.', () => {
      const isValid = validateInput({ country: SUPPORTED_COUNTRY, year: CURRENT_YEAR });
      expect(isValid).toEqual(true);
    });

    test('Should return "true" if country and year are empty.', () => {
      const isValid = validateInput({});
      expect(isValid).toEqual(true);
    });
  });
});
