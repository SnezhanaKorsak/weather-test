import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';

export type TypeForecastData = 'daily' | 'hourly';

const expireTime = new Date().getTime() + 3 * 60 * 60 * 1000;

const initialState = {
  typeForecastData: 'daily' as TypeForecastData,
  expireTime,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeTypeSearch: (state, action: PayloadAction<TypeForecastData>) => {
      state.typeForecastData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const appReducer = appSlice.reducer;

export const { changeTypeSearch } = appSlice.actions;
