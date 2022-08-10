import React from 'react';

import CurrentWeather from '../CurrentWeather';
import DailyWeather from '../dailyForecast/DailyForecast';
import HourlyForecast from '../hourlyForecast/HourlyForecast';

import style from './weather.module.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks';

const WeatherContainer = () => {
  const dispatch = useAppDispatch();
  const typeSearch = useAppSelector((state) => state.app.typeForecastData);

  const currentLocation = useAppSelector((state) => state.weather.currentLocation);

  if (!currentLocation) {
    return null;
  }

  return (
    <div className={style.container}>
      <CurrentWeather currentLocation={currentLocation} />
      {typeSearch === 'daily' ? <DailyWeather currentLocation={currentLocation} /> : <HourlyForecast />}
    </div>
  );
};

export default WeatherContainer;
