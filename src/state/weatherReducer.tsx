import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppDispatch, AppRootState} from './store';
import geocodingAPI from '../api/geocoding-api';
import openWeatherAPI from '../api/openweather-api';
import {Coordinates, CurrentWeather, DailyForecast} from '../api/types';

type InitialState = {
  placeName: string;
  coordinates: null | Coordinates;
  weatherData: {
    timezone: string;
    offset: number;
    current: null | CurrentWeather;
    daily: null | DailyForecast[];
  };
};

const initialState: InitialState = {
  placeName: '',
  coordinates: null,
  weatherData: {
    timezone: '',
    offset: 0,
    current: null,
    daily: null,
  },
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
    setWeatherData: (
      state,
      action: PayloadAction<{current: CurrentWeather; daily: DailyForecast[]; timezone: string; offset: number}>,
    ) => {
      state.weatherData = action.payload;
    },
    setWeatherDataFromCache: (state, action: PayloadAction<InitialState>) => {
      state.placeName = action.payload.placeName;
      state.coordinates = action.payload.coordinates;
      state.weatherData = action.payload.weatherData;
    },
  },
});

export const weatherReducer = weatherSlice.reducer;

// actions
export const {setPlaceName, setCoordinates, setWeatherData, setWeatherDataFromCache} = weatherSlice.actions;

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

export const fetchWeatherData =
  (latitude: number, longitude: number) => (dispatch: AppDispatch, getState: () => AppRootState) => {
    localStorage.setItem('expiresIn', JSON.stringify(new Date().getTime() + 60 * 60 * 1000));

    openWeatherAPI.getDailyForecast(latitude, longitude).then((res) => {
      const {current, daily, timezone, timezone_offset: offset} = res.data;
      dispatch(setWeatherData({current, daily, timezone, offset}));
      const weatherData = getState().weather;
      const key = weatherData.placeName.split(',')[0];
      localStorage.setItem(key, JSON.stringify(weatherData));
    });
  };
