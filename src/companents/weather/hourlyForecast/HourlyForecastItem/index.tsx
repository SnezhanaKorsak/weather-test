import React from 'react';

import { HourlyItemProps } from './types';
import style from './styled.module.scss';

const HourlyItem = ({ data }: HourlyItemProps) => (
  <div className={style.container}>
    <div className={style.temp}>{data.temp}</div>
    <div className={style.block}>
      <div className={style.line} style={{ height: data.temp * 1.5, maxHeight: 45 }} />
      <div className={style.time}>{data.time}</div>
    </div>
  </div>
);

export default HourlyItem;
