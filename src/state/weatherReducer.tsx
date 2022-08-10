import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from './store';

import openWeatherAPI from '../api/openweather-api';
import geocodingAPI from '../api/geocoding-api';

import {
  CurrentForecast,
  CurrentLocation,
  CurrentWeather,
  DailyForecast,
  DailyWeather,
  HourlyForecast,
  HourlyWeather,
} from '../api/types';

/*
export type Location = CurrentLocation & {
  currentWeather: null | CurrentForecast;
  dailyWeather: DailyWeather[];
  hourlyWeather: HourlyForecast[];
};
*/

type InitialState = {
  currentLocation: null | CurrentLocation;
  currentWeathers: CurrentWeather[];
  dailyWeathers: DailyWeather[];
  hourlyWeathers: HourlyWeather[];
};

const initialState: InitialState = {
  currentLocation: null,
  currentWeathers: [],
  dailyWeathers: [],
  hourlyWeathers: [],
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCurrentLocation: (state, action: PayloadAction<CurrentLocation>) => {
      state.currentLocation = action.payload;
    },
    setCurrentWeather: (state, action: PayloadAction<CurrentForecast>) => {
      const newItem = {
        ...action.payload,
        id: state!.currentLocation!.name,
      };
      const currentLocation = state.currentWeathers.find((item) => item.id === newItem.id);
      if (!currentLocation) {
        state.currentWeathers.push(newItem);
      }
    },
    setDailyWeather: (state, action: PayloadAction<DailyForecast[]>) => {
      const newItem = {
        id: state!.currentLocation!.name,
        daily: action.payload,
      };
      const currentLocation = state.dailyWeathers.find((item) => item.id === newItem.id);
      if (!currentLocation) {
        state.dailyWeathers.push(newItem);
      }
    },
    setHourlyWeather: (state, action: PayloadAction<HourlyForecast[]>) => {
      const newItem = {
        id: state!.currentLocation!.name,
        hourly: action.payload,
      };
      const currentLocation = state.hourlyWeathers.find((item) => item.id === newItem.id);
      if (!currentLocation) {
        state.hourlyWeathers.push(newItem);
      }
    },
  },
});

export const weatherReducer = weatherSlice.reducer;

export const { setCurrentLocation, setCurrentWeather, setDailyWeather, setHourlyWeather } = weatherSlice.actions;

export const fetchCurrentLocationByCoordinates = (longitude: number, latitude: number) => (dispatch: AppDispatch) => {
  geocodingAPI.getPlaceNameByCoordinates(longitude, latitude).then((res) => {
    dispatch(setCurrentLocation(res.data[0]));
  });
};

export const fetchCurrentLocationByPlaceName = (placeName: string) => (dispatch: AppDispatch) => {
  geocodingAPI.getCoordinatesByPlaceName(placeName).then((res) => {
    dispatch(setCurrentLocation(res.data[0]));
  });
};

export const fetchCurrentWeather = (latitude: number, longitude: number) => (dispatch: AppDispatch) => {
  localStorage.setItem('expireIn', JSON.stringify(new Date().getTime() + 6 * 60 * 60 * 1000));

  openWeatherAPI.getCurrentWeather(latitude, longitude).then((res) => {
    dispatch(setCurrentWeather(res.data));
  });
};

export const fetchDailyWeather = (latitude: number, longitude: number) => (dispatch: AppDispatch) => {
  openWeatherAPI.getDailyForecast(latitude, longitude).then((res) => {
    dispatch(setDailyWeather(res.data.daily));
  });
};

/*
export const fetchHourlyWeatherData = (latitude: number, longitude: number) => (dispatch: AppDispatch) => {
  stormglassAPI.getHourlyForecast(latitude, longitude).then((res) => {
    dispatch(setHourlyWeather(res.data.hours));

    const key = generateKey(latitude, longitude, '_hourly');
    localStorage.setItem(key, JSON.stringify(res.data.hours));
  });
}; */
