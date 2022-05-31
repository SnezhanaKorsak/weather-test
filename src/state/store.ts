import {configureStore} from '@reduxjs/toolkit';
import {weatherReducer} from './weatherReducer';
import {appReducer} from './appReducer';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    app: appReducer,
  },
});

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
