import React from 'react';

import { useAppSelector } from '../../hooks';
import { getTimeWithOffset } from '../../helpers';
import { date, time } from '../../constants';

import style from './styled.module.scss';

const Calendar = () => {
  const currentWeather = useAppSelector((state) => state.weather.currentWeather);

  if (!currentWeather) {
    return null;
  }
  const offset = currentWeather.timezone;
  const sunriseTime = `${getTimeWithOffset(currentWeather.sys.sunrise, offset)} AM`;
  const sunsetTime = `${getTimeWithOffset(currentWeather.sys.sunset, offset)} PM`;

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
};

export default Calendar;
