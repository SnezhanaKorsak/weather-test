import { call, put, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import geocodingAPI from '../../api/geocoding-api';
import openWeatherAPI from '../../api/openweather-api';
import stormglassAPI from '../../api/stormglass-api';

import { setCurrentLocation, setCurrentWeather, setDailyWeather, setHourlyWeather } from '../reducers/weatherReducer';

import {
  FETCH_CURRENT_WEATHER,
  FETCH_DAILY_WEATHER,
  FETCH_HOURLY_WEATHER,
  FETCH_LOCATION_BY_ADDRESS,
  FETCH_LOCATION_BY_COORDINATES,
} from '../../constants';

import {
  FetchCurrentWeather,
  FetchDailyWeather,
  FetchHourlyWeather,
  FetchLocationByAddress,
  FetchLocationByCoordinates,
} from './types';
import { CurrentForecast, CurrentLocation, DailyWeather, ForecastResponseForStormGlass } from '../../api/types';

export const fetchLocationByCoordinates = (longitude: number, latitude: number) => ({
  type: FETCH_LOCATION_BY_COORDINATES,
  longitude,
  latitude,
});

export const fetchLocationByAddress = (placeName: string) => ({
  type: FETCH_LOCATION_BY_ADDRESS,
  placeName,
});

export const fetchCurrentWeather = (latitude: number, longitude: number) => ({
  type: FETCH_CURRENT_WEATHER,
  latitude,
  longitude,
});

export const fetchDailyWeather = (latitude: number, longitude: number) => ({
  type: FETCH_DAILY_WEATHER,
  latitude,
  longitude,
});

export const fetchHourlyWeather = (latitude: number, longitude: number) => ({
  type: FETCH_HOURLY_WEATHER,
  latitude,
  longitude,
});

export function* fetchLocationByCoordinatesWorker(action: FetchLocationByCoordinates) {
  const result: AxiosResponse<CurrentLocation[]> = yield call(
    geocodingAPI.getPlaceNameByCoordinates,
    action.longitude,
    action.latitude,
  );
  yield put(setCurrentLocation(result.data[0]));
}

export function* fetchLocationByAddressWorker(action: FetchLocationByAddress) {
  const result: AxiosResponse<CurrentLocation[]> = yield call(geocodingAPI.getCoordinatesByPlaceName, action.placeName);
  yield put(setCurrentLocation(result.data[0]));
}

export function* fetchCurrentWeatherWorker(action: FetchCurrentWeather) {
  const result: AxiosResponse<CurrentForecast> = yield call(
    openWeatherAPI.getCurrentWeather,
    action.latitude,
    action.longitude,
  );
  yield put(setCurrentWeather(result.data));
}

export function* fetchDailyWeatherWorker(action: FetchDailyWeather) {
  const result: AxiosResponse<DailyWeather> = yield call(
    openWeatherAPI.getDailyForecast,
    action.latitude,
    action.longitude,
  );
  yield put(setDailyWeather(result.data.daily));
}

export function* fetchHourlyWeatherWorker(action: FetchHourlyWeather) {
  const result: AxiosResponse<ForecastResponseForStormGlass> = yield call(
    stormglassAPI.getHourlyForecast,
    action.latitude,
    action.longitude,
  );
  yield put(setHourlyWeather(result.data.hours));
}

export function* fetchWeatherWatcher() {
  yield takeEvery(FETCH_LOCATION_BY_COORDINATES, fetchLocationByCoordinatesWorker);
  yield takeEvery(FETCH_LOCATION_BY_ADDRESS, fetchLocationByAddressWorker);
  yield takeEvery(FETCH_CURRENT_WEATHER, fetchCurrentWeatherWorker);
  yield takeEvery(FETCH_DAILY_WEATHER, fetchDailyWeatherWorker);
  yield takeEvery(FETCH_HOURLY_WEATHER, fetchHourlyWeatherWorker);
}
