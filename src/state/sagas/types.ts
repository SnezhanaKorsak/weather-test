import {
  fetchCurrentWeather,
  fetchDailyWeather,
  fetchHourlyWeather,
  fetchLocationByAddress,
  fetchLocationByCoordinates,
} from './weatherSaga';

export type FetchLocationByCoordinates = ReturnType<typeof fetchLocationByCoordinates>;
export type FetchLocationByAddress = ReturnType<typeof fetchLocationByAddress>;
export type FetchCurrentWeather = ReturnType<typeof fetchCurrentWeather>;
export type FetchDailyWeather = ReturnType<typeof fetchDailyWeather>;
export type FetchHourlyWeather = ReturnType<typeof fetchHourlyWeather>;
