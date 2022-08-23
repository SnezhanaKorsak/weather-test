import axios from 'axios';
import { ForecastResponseForStormGlass } from '@/types/weatherTypes';

const APIkey = process.env.REACT_APP_STORM_GLASS_API_KEY;

const instance = axios.create({
  baseURL: 'https://api.stormglass.io/v2/weather/',
  headers: {
    Authorization: APIkey!,
  },
});

const stormglassAPI = {
  getHourlyForecast(latitude: number, longitude: number) {
    return instance.get<ForecastResponseForStormGlass>(
      `point?lat=${latitude}&lng=${longitude}&params=airTemperature&source=noaa`,
    );
  },
};

export default stormglassAPI;
