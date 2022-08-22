import React from 'react';

import { getDate, getTime } from '../../../helpers';

import { EventItemResponse } from '../../../types/calendarTypes';
import style from './styled.module.scss';

export const EventItem = ({ start, end, summary }: EventItemResponse) => {
  const day = getDate(start.dateTime);
  const timeStart = getTime(start.dateTime);
  const timeEnd = getTime(end.dateTime);

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
