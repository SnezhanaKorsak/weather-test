import axios from 'axios';
import {ForecastResponseForOpenWeather} from './types';

const APIkey = '912143a6f2471bc4aed9039a5dc6d512';
const instance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
});

const openWeatherAPI = {
  getDailyForecast(latitude: number, longitude: number) {
    return instance.get<ForecastResponseForOpenWeather>(
      `onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=metric&appid=${APIkey}`,
    );
  },
};
export default openWeatherAPI;
