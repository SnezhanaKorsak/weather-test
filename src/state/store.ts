import {configureStore} from '@reduxjs/toolkit';
import {weatherReducer} from './weatherReducer';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
