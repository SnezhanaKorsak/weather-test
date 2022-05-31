import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDispatch} from './store';
import geocodingAPI from '../api/geocoding-api';
import openWeatherAPI from '../api/openweather-api';
import {Coordinates, CurrentWeather, DailyForecast, HourlyWeather} from '../api/types';
import stormglassAPI from '../api/stormflass-api';
import {generateKey} from '../App';

type InitialState = {
  placeName: string;
  coordinates: null | Coordinates;
  currentWeather: null | CurrentWeather;
  dailyWeather: null | DailyForecast[];
  hourlyWeather: HourlyWeather[];
};

const initialState: InitialState = {
  placeName: '',
  coordinates: null,
  currentWeather: null,
  dailyWeather: null,
  hourlyWeather: [],
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setPlaceName: (state, action: PayloadAction<{placeName: string}>) => {
      state.placeName = action.payload.placeName;
    },
    setCoordinates: (state, action: PayloadAction<{coordinates: number[]}>) => {
      state.coordinates = {longitude: action.payload.coordinates[0], latitude: action.payload.coordinates[1]};
    },
    setCurrentWeather: (state, action: PayloadAction<CurrentWeather>) => {
      state.currentWeather = action.payload;
    },
    setDailyWeather: (state, action: PayloadAction<DailyForecast[]>) => {
      state.dailyWeather = action.payload;
    },
    setHourlyWeather: (state, action: PayloadAction<HourlyWeather[]>) => {
      state.hourlyWeather = action.payload;
    },
  },
});

export const weatherReducer = weatherSlice.reducer;

// actions
export const {setPlaceName, setCoordinates, setCurrentWeather, setDailyWeather, setHourlyWeather} =
  weatherSlice.actions;

// thunk
export const fetchPlaceName = (lon: number, lat: number) => (dispatch: AppDispatch) => {
  geocodingAPI.searchPlaceByCoordinates(lon, lat).then((res) => {
    dispatch(setPlaceName({placeName: res.data.features[0].place_name}));
  });
};

export const fetchCoordinates = (placeName: string) => (dispatch: AppDispatch) => {
  geocodingAPI.searchPlaceByName(placeName).then((res) => {
    dispatch(setCoordinates({coordinates: res.data.features[0].geometry.coordinates}));
  });
};

export const fetchCurrentWeather = (latitude: number, longitude: number) => (dispatch: AppDispatch) => {
  localStorage.setItem('expiresIn', JSON.stringify(new Date().getTime() + 3 * 60 * 60 * 1000));

  openWeatherAPI.getCurrentWeather(latitude, longitude).then((res) => {
    dispatch(setCurrentWeather(res.data));

    const key = generateKey(latitude, longitude, '_current');
    localStorage.setItem(key, JSON.stringify(res.data));
  });
};

export const fetchDailyWeather = (latitude: number, longitude: number) => (dispatch: AppDispatch) => {
  openWeatherAPI.getDailyForecast(latitude, longitude).then((res) => {
    dispatch(setDailyWeather(res.data.daily));

    const key = generateKey(latitude, longitude, '_daily');
    localStorage.setItem(key, JSON.stringify(res.data.daily));
  });
};

export const fetchHourlyWeatherData = (latitude: number, longitude: number) => (dispatch: AppDispatch) => {
  stormglassAPI.getHourlyForecast(latitude, longitude).then((res) => {
    dispatch(setHourlyWeather(res.data.hours));

    const key = generateKey(latitude, longitude, '_hourly');
    localStorage.setItem(key, JSON.stringify(res.data));
  });
};
