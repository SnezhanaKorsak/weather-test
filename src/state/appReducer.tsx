import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type TypeForecastData = 'daily' | 'hourly';

const initialState = {
  typeForecastData: 'hourly' as TypeForecastData,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeTypeSearch: (state, action: PayloadAction<{typeForecastData: TypeForecastData}>) => {
      state.typeForecastData = action.payload.typeForecastData;
    },
  },
});

export const appReducer = appSlice.reducer;

// actions
export const {changeTypeSearch} = appSlice.actions;
