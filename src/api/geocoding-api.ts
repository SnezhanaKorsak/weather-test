import axios from 'axios';
import { CurrentLocation } from '@/types/locationTypes';

const APIkey = process.env.REACT_APP_OPENWEATHER_API_KEY;

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
