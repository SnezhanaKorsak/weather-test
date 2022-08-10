import React, { useEffect } from 'react';

import DailyForecastItem from '../DailyForecastItem';

import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { fetchDailyWeather } from '../../../../state/sagas/weatherSaga';

import { WeatherProps } from '../../WeatherContainer/types';
import style from './styled.module.scss';

const DailyWeather = ({ currentLocation }: WeatherProps) => {
  const dispatch = useAppDispatch();
  const weathers = useAppSelector((state) => state.weather.dailyWeathers);

  const { lat, lon, name } = currentLocation;
  const dailyWeather = weathers.find((item) => item.id === name);

  useEffect(() => {
    if (!dailyWeather) {
      dispatch(fetchDailyWeather(lat, lon));
    }
  }, [currentLocation]);

  if (!dailyWeather) {
    return null;
  }

  const dailyItems = dailyWeather.daily
    .slice(0, 6)
    .map((item) => (
      <DailyForecastItem key={item.dt} dt={item.dt} temperature={item.temp.day} icon={item.weather[0].icon} />
    ));

  return <div className={style.container}>{dailyItems}</div>;
};

export default DailyWeather;
