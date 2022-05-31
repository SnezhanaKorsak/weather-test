import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type TypeForecastData = 'daily' | 'hourly';

const initialState = {
  typeForecastData: 'daily' as TypeForecastData,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeTypeSearch: (state, action: PayloadAction<TypeForecastData>) => {
      state.typeForecastData = action.payload;
    },
  },
});

export const appReducer = appSlice.reducer;

// actions
export const {changeTypeSearch} = appSlice.actions;
