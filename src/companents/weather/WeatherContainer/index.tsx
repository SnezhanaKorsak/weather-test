import React, { useEffect } from 'react';
import { shallowEqual } from 'react-redux';

import CurrentWeather from '../CurrentWeather';
import DailyWeather from '../dailyForecast/DailyForecast';
import HourlyForecast from '../hourlyForecast/HourlyForecast';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  fetchDailyWeather,
  fetchHourlyWeatherData,
  setDailyWeather,
  setHourlyWeather,
} from '../../../state/weatherReducer';
import { generateKey } from '../../../helpers';

import style from './weather.module.scss';

const WeatherContainer = () => {
  const dispatch = useAppDispatch();
  const coordinates = useAppSelector((state) => state.weather.coordinates, shallowEqual);
  const typeSearch = useAppSelector((state) => state.app.typeForecastData, shallowEqual);

  useEffect(() => {
    if (coordinates && typeSearch && typeSearch === 'daily') {
      const key = generateKey(coordinates.latitude, coordinates.longitude, '_daily');
      const dataFromCache = localStorage.getItem(key);

      if (dataFromCache) {
        dispatch(setDailyWeather(JSON.parse(dataFromCache)));
      } else {
        const { latitude, longitude } = coordinates;
        dispatch(fetchDailyWeather(latitude, longitude));
      }
    }
    if (coordinates && typeSearch && typeSearch === 'hourly') {
      const key = generateKey(coordinates.latitude, coordinates.longitude, '_hourly');
      const dataFromCache = localStorage.getItem(key);

      if (dataFromCache) {
        dispatch(setHourlyWeather(JSON.parse(dataFromCache)));
      } else {
        const { latitude, longitude } = coordinates;
        dispatch(fetchHourlyWeatherData(latitude, longitude));
      }
    }
  }, [coordinates, typeSearch]);

  return (
    <div className={style.container}>
      <CurrentWeather />
      {typeSearch === 'daily' ? <DailyWeather /> : <HourlyForecast />}
    </div>
  );
};

export default WeatherContainer;
