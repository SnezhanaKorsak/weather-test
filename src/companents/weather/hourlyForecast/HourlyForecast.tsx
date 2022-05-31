import React, {useState} from 'react';
import style from './HourlyForecast.module.scss';
import {useAppSelector} from '../../../state/hooks';
import HourlyItem from './HourlyItem';

function HourlyForecast() {
  const hourlyWeather = useAppSelector((state) => state.weather.hourlyWeather);

  const step = 24;
  const [portion, setPortion] = useState(0);

  if (!hourlyWeather) {
    return null;
  }

  const getTime = (value: string) =>
    new Date(value).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
    });

  const days = hourlyWeather.map((item) => new Date(item.time).getDay()).slice(portion, portion + step);
  const dayWeak = ['Sun', 'Mon', 'Tue', ' Wed', 'Thu', 'Fri', 'Sat'][days[0]];

  const showPrevious = () => setPortion((state) => state - step);
  const showNext = () => setPortion((state) => state + step);

  const data = hourlyWeather
    .slice(portion, portion + step)
    .map((item) => ({time: getTime(item.time), temp: Math.ceil(item.airTemperature.noaa)}));

  const hourlyItems = data.map((item) => <HourlyItem key={item.time} data={item} />);

  const classNamePrevious = portion === 0 ? style.disabled : style.left;
  const classNameNext = portion === 144 ? style.disabled : style.right;

  return (
    <div className={style.container}>
      <div className={style.slider}>
        <div className={classNamePrevious} onClick={showPrevious} onKeyDown={showPrevious} aria-hidden="true" />
        <div className={style.day}>{dayWeak}</div>
        <div className={classNameNext} onClick={showNext} onKeyDown={showNext} aria-hidden="true" />
      </div>

      <div className={style.itemsContainer}>{hourlyItems}</div>
    </div>
  );
}

export default HourlyForecast;
