import React from 'react';
import {useAppSelector} from '../../state/hooks';
import style from './Weather.module.scss';
import CurrentWeather from './current/CurrentWeather';
import DailyWeather from './forecast/DailyWeather';

function Weather() {
  const weather = useAppSelector((state) => state.weather.weatherData);

  if (!weather.daily && !weather.daily) {
    return null;
  }

  return (
    <div className={style.container}>
      <CurrentWeather />
      <DailyWeather />
    </div>
  );
}

export default Weather;
