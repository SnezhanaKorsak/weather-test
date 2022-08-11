import React from 'react';

import { EventItemResponse } from '../../../api/types';
import style from './styled.module.scss';

export const EventItem = ({ start, end, summary }: EventItemResponse) => {
  const day = new Date(start.dateTime).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  const timeStart = new Date(start.dateTime).toLocaleTimeString('en-US', {
    hour12: false,
    hour: 'numeric',
    minute: '2-digit',
  });
  const timeEnd = new Date(end.dateTime).toLocaleTimeString('en-US', {
    hour12: false,
    hour: 'numeric',
    minute: '2-digit',
  });
  return (
    <div className={style.block}>
      <div>{day}</div>
      <div className={style.event}>
        <div className={style.date}>
          {timeStart} - {timeEnd}
        </div>
        {summary}
      </div>
    </div>
  );
};
