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
  sunrise: number;
  sunset: number;
  temp: Temperature;
  weather: Weather[];
  clouds: number;
};

export interface CurrentWeather {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  wind_speed: number;
  weather: Weather[];
}

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

export type ForecastResponseForOpenWeather = {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentWeather;
  daily: DailyForecast[];
};
