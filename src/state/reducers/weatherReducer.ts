import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import {
  CurrentForecast,
  CurrentWeather,
  DailyForecast,
  DailyWeather,
  HourlyForecast,
  HourlyWeather,
} from '@/types/weatherTypes';
import { CurrentLocation } from '@/types/locationTypes';

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
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const weatherReducer = weatherSlice.reducer;

export const { setCurrentLocation, setCurrentWeather, setDailyWeather, setHourlyWeather } = weatherSlice.actions;
