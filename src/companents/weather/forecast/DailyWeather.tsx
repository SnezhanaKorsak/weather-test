import React from 'react';
import {useAppSelector} from '../../../state/hooks';
import style from './DailyWeather.module.scss';
import DailyItem from './DailyItem';

function DailyWeather() {
  const dailyWeather = useAppSelector((state) => state.weather.weatherData.daily);

  if (!dailyWeather) {
    return null;
  }

  const today = new Date().getDay();

  const dailyItems = dailyWeather
    .filter((item) => new Date(item.dt * 1000).getDay() !== today)
    .map((item) => (
      <DailyItem key={item.dt} dt={item.dt} temperature={item.temp.day} icon={item.weather[0].icon} />
    ));

  return <div className={style.container}>{dailyItems}</div>;
}

export default DailyWeather;
