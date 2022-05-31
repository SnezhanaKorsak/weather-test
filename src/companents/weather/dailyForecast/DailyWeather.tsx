import React from 'react';
import {useAppSelector} from '../../../state/hooks';
import DailyItem from './DailyItem';
import style from './DailyWeather.module.scss';

function DailyWeather() {
  const dailyWeather = useAppSelector((state) => state.weather.dailyWeather);

  if (!dailyWeather) {
    return null;
  }

  const dailyItems = dailyWeather
    .slice(0, 6)
    .map((item) => <DailyItem key={item.dt} dt={item.dt} temperature={item.temp.day} icon={item.weather[0].icon} />);

  return <div className={style.container}>{dailyItems}</div>;
}

export default DailyWeather;
