import { all } from 'redux-saga/effects';

import { fetchWeatherWatcher } from './weatherSaga';

export function* rootSaga() {
  yield all([fetchWeatherWatcher()]);
}
