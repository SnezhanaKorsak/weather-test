import { combineReducers } from '@reduxjs/toolkit';

import { weatherReducer } from './weatherReducer';
import { appReducer } from './appReducer';
import { calendarReducer } from './calendarReducer';

export const rootReducer = combineReducers({
  weather: weatherReducer,
  app: appReducer,
  calendar: calendarReducer,
});
