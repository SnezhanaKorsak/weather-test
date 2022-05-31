import axios from 'axios';
import {ForecastResponseForStormGlass} from './types';

const instance = axios.create({
  baseURL: 'https://api.stormglass.io/v2/weather/',
  headers: {
    Authorization: 'ee792244-e067-11ec-becb-0242ac130002-ee7922bc-e067-11ec-becb-0242ac130002',
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
