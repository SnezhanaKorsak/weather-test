import axios from 'axios';
import { CurrentLocation } from './types';

const APIkey = '912143a6f2471bc4aed9039a5dc6d512';
const instance = axios.create({
  baseURL: 'https://api.openweathermap.org/geo/1.0/',
});
const geocodingAPI = {
  getPlaceNameByCoordinates(longitude: number, latitude: number) {
    return instance.get<CurrentLocation[]>(`reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${APIkey}`);
  },
  getCoordinatesByPlaceName(placeName: string) {
    return instance.get<CurrentLocation[]>(`direct?q=${placeName}&limit=1&appid=${APIkey}`);
  },
};

export default geocodingAPI;
