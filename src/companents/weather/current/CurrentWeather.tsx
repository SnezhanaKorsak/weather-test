import React from 'react';
import {useAppSelector} from '../../../state/hooks';
import style from './CurrentWeather.module.scss';

function CurrentWeather() {
  const currentWeather = useAppSelector((state) => state.weather.weatherData.current);

  if (!currentWeather) {
    return null;
  }

  const temp = `${Math.ceil(currentWeather.temp)} °`;

  return (
    <div className={style.container}>
      <div>
        <img src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`} alt="icon" />
      </div>
      <div className={style.description}>
        <div className={style.day}>Today</div>
        <div className={style.temp}>{temp}</div>
      </div>
    </div>
  );
}

export default CurrentWeather;
