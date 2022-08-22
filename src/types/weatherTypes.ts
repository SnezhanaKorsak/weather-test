import { Coordinates } from './locationTypes';

export type Temperature = {
  day: number;
  night: number;
};

export type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export interface CurrentForecast {
  coord: Coordinates;
  weather: Weather[];
  main: { temp: number };
  dt: number;
  sys: { country: string; sunrise: number; sunset: number };
  timezone: number;
  name: string;
}

export type DailyForecast = {
  dt: number;
  temp: Temperature;
  weather: Weather[];
};

export type HourlyForecast = {
  airTemperature: { noaa: number };
  time: string;
};

export type ForecastResponseForStormGlass = {
  hours: HourlyForecast[];
};

export type CurrentWeather = CurrentForecast & {
  id: string;
};

export type DailyWeather = {
  id: string;
  daily: DailyForecast[];
};

export type HourlyWeather = {
  id: string;
  hourly: HourlyForecast[];
};
