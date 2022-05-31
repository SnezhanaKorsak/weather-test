import axios from 'axios';
import {GeocodingResponse} from './types';

const APIkey = 'pk.eyJ1Ijoic25lemhhbmEyOCIsImEiOiJja3liZHo0NjIwZW9jMzBvZDY0MjdveXVtIn0.Z9GOZIEWFStUHnAT-COL2g';
const instance = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places/',
});

const geocodingAPI = {
  searchPlaceByCoordinates(longitude: number, latitude: number) {
    return instance.get<GeocodingResponse>(`${longitude},${latitude}.json?types=place&access_token=${APIkey}`);
  },
  searchPlaceByName(placeName: string) {
    return instance.get<GeocodingResponse>(`${placeName}.json?language=en&access_token=${APIkey}`);
  },
};

export default geocodingAPI;
