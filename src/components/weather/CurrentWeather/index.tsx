import React, { useEffect } from 'react';

import { useAppDispatch, useWeatherLocation } from '@/hooks';
import { fetchCurrentWeather } from '@/sagas/weatherSaga';

import style from './styled.module.scss';

const CurrentWeather = () => {
  const dispatch = useAppDispatch();
  const { currentWeather, location } = useWeatherLocation();

  const { lat, lon } = location!;

  useEffect(() => {
    if (!currentWeather) {
      dispatch(fetchCurrentWeather(lat, lon));
    }
  }, [location]);

  if (!currentWeather) {
    return null;
  }

  const temp = `${Math.ceil(currentWeather.main.temp)} °`;

  return (
    <div className={style.container}>
      <div className={style.icon}>
        <img src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`} alt="icon" />
      </div>
      <div className={style.description}>
        <div className={style.day}>Today</div>
        <div className={style.temp}>{temp}</div>
      </div>
    </div>
  );
};

export default CurrentWeather;
