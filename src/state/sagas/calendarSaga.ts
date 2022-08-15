import { put, call, takeEvery } from 'redux-saga/effects';

import { setEvents, setAuth } from '../reducers/calendarReducer';
import { apiCalendar } from '../../api/googleCalendar';

import { FETCH_CALENDAR_EVENTS, CALENDAR_AUTHORIZED } from '../../constants';

import { EventsListResponse } from '../../api/types';

export const fetchCalendarEvents = () => ({ type: FETCH_CALENDAR_EVENTS });
export const authorizedCalendar = () => ({ type: CALENDAR_AUTHORIZED });

function* authorizedCalendarWorker() {
  yield call(apiCalendar.handleAuthClick);
  yield put(setAuth(true));
}

function* fetchEventsFromCalendarWorker() {
  try {
    const response: EventsListResponse = yield call(apiCalendar.listUpcomingEvents, 10);
    yield put(setEvents(response));
  } catch (e) {
    yield put(setAuth(false));
  }
}

export function* fetchCalendarEventsWatcher() {
  yield takeEvery(CALENDAR_AUTHORIZED, authorizedCalendarWorker);
  yield takeEvery(FETCH_CALENDAR_EVENTS, fetchEventsFromCalendarWorker);
}
