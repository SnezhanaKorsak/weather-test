export type Coordinates = {
  latitude: number;
  longitude: number;
};

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

export type Place = {
  id: string;
  place_name: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
};

export interface CurrentLocation {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

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
