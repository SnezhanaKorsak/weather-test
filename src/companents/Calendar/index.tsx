import React, { MouseEvent} from 'react';
import { v1 } from 'uuid';

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

  const handleItemClick = (event: MouseEvent<HTMLButtonElement>) => {
    const buttonLabel = event.currentTarget.textContent;
    if (buttonLabel === SIGN_IN) {
      dispatch(authorizedCalendar());
    } else {
      dispatch(fetchCalendarEvents());
    }
  };

  const time = getTime();

  return (
    <div className={style.container}>
      <div className={style.time}>{time}</div>
      <div className={style.date}>{date}</div>
      <button className={style.button} type="button" onClick={handleItemClick}>
        {!isAuth ? SIGN_IN : SYNCHRONIZE}
      </button>
      <div className={style.eventsContainer}>
        {events.length > 0 && events.map((item) => <EventItem key={v1()} {...item} />)}
      </div>
    </div>
  );
};

export default Calendar;
