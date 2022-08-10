import axios from 'axios';
import { CurrentForecast, DailyWeather } from './types';

const APIkey = '912143a6f2471bc4aed9039a5dc6d512';
const instance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
});

const openWeatherAPI = {
  getCurrentWeather(latitude: number, longitude: number) {
    return instance.get<CurrentForecast>(`weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APIkey}`);
  },
  getDailyForecast(latitude: number, longitude: number) {
    return instance.get<DailyWeather>(
      `onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=metric&appid=${APIkey}`,
    );
  },
};
export default openWeatherAPI;
