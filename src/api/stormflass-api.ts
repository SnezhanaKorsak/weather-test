import axios from 'axios';
import {ForecastResponseForStormGlass} from './types';

const instance = axios.create({
  baseURL: 'https://api.stormglass.io/v2/weather/',
  headers: {
    Authorization: 'f01dc6b8-e0d0-11ec-b706-0242ac130002-f01dc76c-e0d0-11ec-b706-0242ac130002',
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
