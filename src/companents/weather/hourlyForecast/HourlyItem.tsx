import React from 'react';
import style from './HourlyItem.module.scss';

type HourlyItemProps = {
  data: {time: string; temp: number};
};

function HourlyItem({data}: HourlyItemProps) {
  return (
    <div className={style.container}>
      <div className={style.temp}>{data.temp}</div>
      <div className={style.block}>
        <div className={style.line} style={{height: data.temp * 1.5}} />
        <div className={style.time}>{data.time}</div>
      </div>
    </div>
  );
}

export default HourlyItem;
