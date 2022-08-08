import React from 'react';

import DailyForecastItem from '../DailyForecastItem';

import { useAppSelector } from '../../../../hooks';

import style from './styled.module.scss';

const DailyWeather = () => {
  const dailyWeather = useAppSelector((state) => state.weather.dailyWeather);

  if (!dailyWeather) {
    return null;
  }

  const dailyItems = dailyWeather
    .slice(0, 6)
    .map((item) => (
      <DailyForecastItem key={item.dt} dt={item.dt} temperature={item.temp.day} icon={item.weather[0].icon} />
    ));

  return <div className={style.container}>{dailyItems}</div>;
};

export default DailyWeather;
