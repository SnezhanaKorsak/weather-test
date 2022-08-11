import { all } from 'redux-saga/effects';

import { fetchWeatherWatcher } from './weatherSaga';
import { fetchCalendarEventsWatcher } from './calendarSaga';

export function* rootSaga() {
  yield all([fetchWeatherWatcher(), fetchCalendarEventsWatcher()]);
}
