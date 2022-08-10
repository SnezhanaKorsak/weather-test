import React, { useState } from 'react';

import HourlyForecastItem from '../HourlyForecastItem';
import { useAppSelector } from '../../../../hooks';

import style from './styled.module.scss';
import { getTime } from '../../../../helpers';

const step = 24;

const HourlyForecast = () => {
  const hourlyWeather = useAppSelector((state) => state.weather);

  const [portion, setPortion] = useState(0);

  if (!hourlyWeather) {
    return null;
  }

  // const days = hourlyWeather.map((item) => new Date(item.time).getDay()).slice(portion, portion + step);
  // const dayWeak = ['Sun', 'Mon', 'Tue', ' Wed', 'Thu', 'Fri', 'Sat'][days[0]];

  const showPrevious = () => setPortion((state) => state - step);
  const showNext = () => setPortion((state) => state + step);

  /* const data = hourlyWeather
    .slice(portion, portion + step)
    .map((item) => ({ time: getTime(item.time), temp: Math.ceil(item.airTemperature.noaa) }));

  const hourlyItems = data.map((item) => <HourlyForecastItem key={item.time} data={item} />); */

  const classNamePrevious = portion === 0 ? style.disabled : style.left;
  const classNameNext = portion === 144 ? style.disabled : style.right;

  return (
    <div className={style.container}>
      <div className={style.slider}>
        <div className={classNamePrevious} onClick={showPrevious} onKeyDown={showPrevious} aria-hidden="true" />
        {/* <div className={style.day}>{dayWeak}</div> */}
        <div className={classNameNext} onClick={showNext} onKeyDown={showNext} aria-hidden="true" />
      </div>

      {/* <div className={style.itemsContainer}>{hourlyItems}</div> */}
    </div>
  );
};

export default HourlyForecast;
