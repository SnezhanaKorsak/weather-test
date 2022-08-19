import axios from 'axios';
import { CurrentLocation } from './types';

const APIkey = process.env.REACT_APP_OPENWEATHER_API_KEY;

const instance = axios.create({
  baseURL: 'https://api.openweathermap.org/geo/1.0/',
});
const geocodingAPI = {
  getPlaceNameByCoordinates(longitude: number, latitude: number) {
    console.log(APIkey);
    return instance.get<CurrentLocation[]>(`reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${APIkey}`);
  },
  getCoordinatesByPlaceName(placeName: string) {
    console.log(process.env['GEOCODING_API_KEY ']);
    return instance.get<CurrentLocation[]>(`direct?q=${placeName}&limit=1&appid=${APIkey}`);
  },
};

export default geocodingAPI;
