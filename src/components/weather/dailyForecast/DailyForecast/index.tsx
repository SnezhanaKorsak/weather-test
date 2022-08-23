import React, { useEffect } from 'react';

import { useAppDispatch, useWeatherLocation } from '@/hooks';
import { fetchDailyWeather } from '@/sagas/weatherSaga';

import DailyForecastItem from '../DailyForecastItem';

import style from './styled.module.scss';

const DailyWeather = () => {
  const dispatch = useAppDispatch();
  const { dailyWeather, location } = useWeatherLocation();

  const { lat, lon } = location!;

  useEffect(() => {
    if (!dailyWeather) {
      dispatch(fetchDailyWeather(lat, lon));
    }
  }, [location]);

  if (!dailyWeather) {
    return null;
  }

  const dailyItems = dailyWeather.daily
    .slice(0, 6)
    .map(({ dt, temp, weather }) => (
      <DailyForecastItem key={dt} dt={dt} temperature={temp.day} icon={weather[0].icon} />
    ));

  return <div className={style.container}>{dailyItems}</div>;
};

export default DailyWeather;
