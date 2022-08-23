import React from 'react';

import CurrentWeather from '@/components/weather/CurrentWeather';
import DailyWeather from '@/components/weather/dailyForecast/DailyForecast';
import HourlyForecast from '@/components/weather/hourlyForecast/HourlyForecast';

import { useAppSelector } from '@/hooks';

import style from './weather.module.scss';

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
