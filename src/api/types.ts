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

export type DailyForecast = {
  dt: number;
  temp: Temperature;
  weather: Weather[];
};

export type Place = {
  id: string;
  place_name: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
};

export interface GeocodingResponse {
  features: Place[];
}

export interface CurrentWeather {
  weather: Weather[];
  main: {temp: number};
  dt: number;
  sys: {sunrise: number; sunset: number};
  timezone: number;
}

export type DailyWeather = {
  daily: DailyForecast[];
};

export type HourlyWeather = {
  airTemperature: {noaa: number};
  time: string;
};

export type ForecastResponseForStormGlass = {
  hours: HourlyWeather[];
};
