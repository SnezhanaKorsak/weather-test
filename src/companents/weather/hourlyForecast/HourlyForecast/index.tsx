import React, { useEffect, useState } from 'react';

import HourlyForecastItem from '../HourlyForecastItem';

import { fetchHourlyWeather } from '../../../../state/sagas/weatherSaga';
import { useAppDispatch, useWeatherLocation } from '../../../../hooks';
import { getTime } from '../../../../helpers';

import { WeatherProps } from '../../WeatherContainer/types';
import style from './styled.module.scss';

const step = 24;

const HourlyForecast = ({ currentLocation }: WeatherProps) => {
  const dispatch = useAppDispatch();
  const { hourlyWeather, location } = useWeatherLocation();

  const { lat, lon } = location!;

  const [portion, setPortion] = useState(0);

  useEffect(() => {
    if (!hourlyWeather) {
      dispatch(fetchHourlyWeather(lat, lon));
    }
  }, [currentLocation]);

  if (!hourlyWeather) {
    return null;
  }

  const days = hourlyWeather.hourly.map((item) => new Date(item.time).getDay()).slice(portion, portion + step);
  const dayWeak = ['Sun', 'Mon', 'Tue', ' Wed', 'Thu', 'Fri', 'Sat'][days[0]];

  const showPrevious = () => setPortion((state) => state - step);
  const showNext = () => setPortion((state) => state + step);

  const data = hourlyWeather.hourly
    .slice(portion, portion + step)
    .map((item) => ({ time: getTime(item.time), temp: Math.ceil(item.airTemperature.noaa) }));

  const hourlyItems = data.map((item) => <HourlyForecastItem key={item.time} data={item} />);

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
};

export default HourlyForecast;
