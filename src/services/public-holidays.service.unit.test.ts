import axios from 'axios';
import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from './public-holidays.service';
import { validateInput, shortenPublicHoliday } from '../helpers';
import { PublicHoliday, PublicHolidayShort } from '../types';
import { PUBLIC_HOLIDAYS_API_URL } from '../config';

const YEAR = 2024;
const COUNTRY = 'GB';
const URL = {
  getListOfPublicHolidays: `${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${YEAR}/${COUNTRY}`,
  checkIfTodayIsPublicHoliday: `${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${COUNTRY}`,
  getNextPublicHolidays: `${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${COUNTRY}`,
};
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

jest.mock('../helpers');
const validateInputMock = jest.mocked(validateInput);
const shortenPublicHolidayMock = jest.mocked(shortenPublicHoliday);
shortenPublicHolidayMock.mockImplementation(
  (holiday: PublicHoliday): PublicHolidayShort => ({
    name: holiday.name,
    localName: holiday.localName,
    date: holiday.date,
  }),
);

const axiosGetSpy = jest.spyOn(axios, 'get');

describe('Tests for module "public-holiday".', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Tests for function "getListOfPublicHolidays".', () => {
    beforeEach(() => {
      axiosGetSpy.mockResolvedValue({ data: [PUBLIC_HOLIDAY] });
    });

    test('Should validate input parameter.', async () => {
      await getListOfPublicHolidays(YEAR, COUNTRY);
      expect(validateInputMock).toHaveBeenCalledWith({ year: YEAR, country: COUNTRY });
    });

    test('Should call API with proper parameter.', async () => {
      await getListOfPublicHolidays(YEAR, COUNTRY);
      expect(axiosGetSpy).toHaveBeenCalledWith(URL.getListOfPublicHolidays);
    });

    test('Should return list of public holidays.', async () => {
      const publicHolidays = await getListOfPublicHolidays(YEAR, COUNTRY);
      expect(publicHolidays).toEqual([PUBLIC_HOLIDAY_SHORT]);
    });

    test('Should return empty list of public holidays for API call with error.', async () => {
      axiosGetSpy.mockRejectedValue(new Error());
      const publicHolidays = await getListOfPublicHolidays(YEAR, COUNTRY);
      expect(publicHolidays).toEqual([]);
    });
  });

  describe('Tests for function "checkIfTodayIsPublicHoliday".', () => {
    beforeEach(() => {
      axiosGetSpy.mockResolvedValue({ status: 200 });
    });

    test('Should validate input parameter.', async () => {
      await checkIfTodayIsPublicHoliday(COUNTRY);
      expect(validateInputMock).toHaveBeenCalledWith({ country: COUNTRY });
    });

    test('Should call API with proper parameter.', async () => {
      await checkIfTodayIsPublicHoliday(COUNTRY);
      expect(axiosGetSpy).toHaveBeenCalledWith(URL.checkIfTodayIsPublicHoliday);
    });

    test('Should return "true" if today is public holiday.', async () => {
      const todayIsPublicHoliday = await checkIfTodayIsPublicHoliday(COUNTRY);
      expect(todayIsPublicHoliday).toEqual(true);
    });

    test('Should return "false" if today is not public holiday.', async () => {
      axiosGetSpy.mockResolvedValue({ status: 204 });
      const todayIsPublicHoliday = await checkIfTodayIsPublicHoliday(COUNTRY);
      expect(todayIsPublicHoliday).toEqual(false);
    });

    test('Should return "false" for API call with error.', async () => {
      axiosGetSpy.mockRejectedValue(new Error());
      const todayIsPublicHoliday = await checkIfTodayIsPublicHoliday(COUNTRY);
      expect(todayIsPublicHoliday).toEqual(false);
    });
  });

  describe('Tests for function "getNextPublicHolidays".', () => {
    beforeEach(() => {
      axiosGetSpy.mockResolvedValue({ data: [PUBLIC_HOLIDAY] });
    });

    test('Should validate input parameter.', async () => {
      await getNextPublicHolidays(COUNTRY);
      expect(validateInputMock).toHaveBeenCalledWith({ country: COUNTRY });
    });

    test('Should call API with proper parameter.', async () => {
      await getNextPublicHolidays(COUNTRY);
      expect(axiosGetSpy).toHaveBeenCalledWith(URL.getNextPublicHolidays);
    });

    test('Should return list of next public holidays.', async () => {
      const publicHolidays = await getNextPublicHolidays(COUNTRY);
      expect(publicHolidays).toEqual([PUBLIC_HOLIDAY_SHORT]);
    });

    test('Should return empty list of next public holidays for API call with error.', async () => {
      axiosGetSpy.mockRejectedValue(new Error());
      const publicHolidays = await getNextPublicHolidays(COUNTRY);
      expect(publicHolidays).toEqual([]);
    });
  });
});
