import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchCurrentWeather } from '../../../state/sagas/weatherSaga';

import { WeatherProps } from '../WeatherContainer/types';
import style from './styled.module.scss';

const CurrentWeather = ({ currentLocation }: WeatherProps) => {
  const dispatch = useAppDispatch();
  const weathers = useAppSelector((state) => state.weather.currentWeathers);

  const { lat, lon, name } = currentLocation;
  const currentWeather = weathers.find((item) => item.id === name);

  useEffect(() => {
    if (!currentWeather) {
      dispatch(fetchCurrentWeather(lat, lon));
    }
  }, [currentLocation]);

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
