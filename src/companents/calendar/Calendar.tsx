import React from 'react';
import {useAppSelector} from '../../state/hooks';
import style from './Calendar.module.scss';

const getTime = (time: number, offset: number) => {
  const dt = new Date((time + offset) * 1000);
  return dt
    .toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
    })
    .slice(0, 5);
};

function Calendar() {
  const currentWeather = useAppSelector((state) => state.weather.currentWeather);

  if (!currentWeather) {
    return null;
  }
  const offset = currentWeather.timezone;

  const time = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    day: 'numeric',
    month: 'long',
  });

  const sunriseTime = `${getTime(currentWeather.sys.sunrise, offset)} AM`;
  const sunsetTime = `${getTime(currentWeather.sys.sunset, offset)} PM`;

  return (
    <div className={style.container}>
      <div className={style.time}>
        {time.slice(0, 5)}
        <span className={style.timeType}>{time.slice(5)}</span>
      </div>
      <div className={style.date}>{date}</div>
      <div className={style.timeBlock}>
        <div className={style.period}>
          <div className={style.point}>{sunriseTime}</div>
          <div className={style.description}>Sunrise</div>
        </div>
        <div className={style.separator} />
        <div className={style.period}>
          <div className={style.point}>{sunsetTime}</div>
          <div className={style.description}>Sunset</div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
