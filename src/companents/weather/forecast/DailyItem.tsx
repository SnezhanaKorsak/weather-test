import React from 'react';
import style from './DailyWeather.module.scss';

type DailyItemProps = {
  dt: number;
  temperature: number;
  icon: string;
};

function DailyItem({dt, temperature, icon}: DailyItemProps) {
  const dayWeak = ['Mon', 'Tue', ' Wed', 'Thu', 'Fri', 'Sat', 'Sun'][new Date(dt * 1000).getDay()];
  const temp = `${Math.ceil(temperature)} °`;

  return (
    <div className={style.block}>
      <div className={style.day}>{dayWeak}</div>
      <div className={style.icon}>
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="icon" />
      </div>
      <div className={style.temp}>{temp}</div>
    </div>
  );
}

export default DailyItem;
