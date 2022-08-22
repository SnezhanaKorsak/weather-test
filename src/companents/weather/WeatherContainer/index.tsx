import React from 'react';

import CurrentWeather from '../CurrentWeather';
import DailyWeather from '../dailyForecast/DailyForecast';
import HourlyForecast from '../hourlyForecast/HourlyForecast';

import style from './weather.module.scss';
import { useAppSelector } from '../../../hooks';

const WeatherContainer = () => {
  const typeSearch = useAppSelector((state) => state.app.typeForecastData);

  const currentLocation = useAppSelector((state) => state.weather.currentLocation);

  if (!currentLocation) {
    return null;
  }

  return (
    <div className={style.container}>
      <CurrentWeather />
      {typeSearch === 'daily' ? <DailyWeather /> : <HourlyForecast currentLocation={currentLocation} />}
    </div>
  );
};

export default WeatherContainer;
