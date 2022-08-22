import React from 'react';

import { EventItem } from './EventItem';

import { authorizedCalendar, fetchCalendarEvents } from '../../state/sagas/calendarSaga';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { SIGN_IN, SYNCHRONIZE, date } from '../../constants';

import style from './styled.module.scss';
import { getTime } from '../../helpers';

const Calendar = () => {
  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.calendar.items);
  const isAuth = useAppSelector((state) => state.calendar.isAuth);

  const handleItemClick = () => {
    if (isAuth) {
      dispatch(fetchCalendarEvents());
    } else {
      dispatch(authorizedCalendar());
    }
  };

  const time = getTime();

  return (
    <div className={style.container}>
      <div className={style.time}>{time}</div>
      <div className={style.date}>{date}</div>
      <button className={style.button} type="button" onClick={handleItemClick}>
        {isAuth ? SYNCHRONIZE : SIGN_IN}
      </button>
      <div className={style.eventsContainer}>
        {events.length > 0 && events.map((item) => <EventItem key={item.start.dateTime} {...item} />)}
      </div>
    </div>
  );
};

export default Calendar;
