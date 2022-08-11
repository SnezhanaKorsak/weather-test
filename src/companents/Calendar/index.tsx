import React, { MouseEvent, useEffect, useState } from 'react';
import { v1 } from 'uuid';

import { EventItem } from './EventItem';

import { fetchCalendarEvents } from '../../state/sagas/calendarSaga';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { apiCalendar } from '../../api/googleCalendar';
import { SIGN_IN, SYNCHRONIZE, date, time } from '../../constants';

import style from './styled.module.scss';

const Calendar = () => {
  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.calendar.items);

  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleItemClick = (event: MouseEvent<HTMLButtonElement>) => {
    const buttonLabel = event.currentTarget.textContent;
    if (buttonLabel === SIGN_IN) {
      apiCalendar.handleAuthClick();
      setIsAuthorized(true);
    } else {
      dispatch(fetchCalendarEvents());
    }
  };

  useEffect(() => console.log(apiCalendar.sign));

  return (
    <div className={style.container}>
      <div className={style.time}>
        {time.slice(0, 5)}
        <span className={style.timeType}>{time.slice(5)}</span>
      </div>
      <div className={style.date}>{date}</div>
      <button className={style.button} type="button" onClick={handleItemClick}>
        {!isAuthorized ? SIGN_IN : SYNCHRONIZE}
      </button>
      <div className={style.eventsContainer}>
        {events.length > 0 && events.map((item) => <EventItem key={v1()} {...item} />)}
      </div>
    </div>
  );
};

export default Calendar;

/*

const Calendar = () => {
  const currentWeather = useAppSelector((state) => state.weather);

  if (!currentWeather) {
    return null;
  }
  // const offset = currentWeather.timezone;
  // const sunriseTime = `${getTimeWithOffset(currentWeather.sys.sunrise, offset)} AM`;
  // const sunsetTime = `${getTimeWithOffset(currentWeather.sys.sunset, offset)} PM`;

  return (
    <div className={style.container}>
      <div className={style.time}>
        {time.slice(0, 5)}
        <span className={style.timeType}>{time.slice(5)}</span>
      </div>
      <div className={style.date}>{date}</div>
      <div className={style.timeBlock}>
        <div className={style.period}>
          {/!* <div className={style.point}>{sunriseTime}</div> *!/}
          <div className={style.description}>Sunrise</div>
        </div>
        <div className={style.separator} />
        <div className={style.period}>
          {/!*  <div className={style.point}>{sunsetTime}</div> *!/}
          <div className={style.description}>Sunset</div>
        </div>
      </div>
    </div>
  );
}; */
