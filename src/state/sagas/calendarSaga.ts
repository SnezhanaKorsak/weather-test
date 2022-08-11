import { put, call, takeEvery } from 'redux-saga/effects';

import { setEvents } from '../reducers/calendarReducer';
import { apiCalendar } from '../../api/googleCalendar';

import { FETCH_CALENDAR_EVENTS } from '../../constants';

import { EventsListResponse } from '../../api/types';

export const fetchCalendarEvents = () => ({ type: FETCH_CALENDAR_EVENTS });

function* fetchEventsFromCalendarWorker() {
  // debugger;
  const response: EventsListResponse = yield call(apiCalendar.listUpcomingEvents, 10);
  console.log(response);
  yield put(setEvents(response));
}

export function* fetchCalendarEventsWatcher() {
  yield takeEvery(FETCH_CALENDAR_EVENTS, fetchEventsFromCalendarWorker);
}
