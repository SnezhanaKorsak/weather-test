import React from 'react';
import style from './Calendar.module.scss';

function Calendar() {
  const time = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className={style.container}>
      <div className={style.time}>
        {time.slice(0, 5)}
        <span className={style.timeType}>{time.slice(5)}</span>
      </div>
      <div className={style.date}>{date}</div>
      <div>
        <div className={style.period}>
          <div className={style.point}>08:00</div>
          <div className={style.description}>Sunrise</div>
        </div>
        <div className={style.separator} />
        <div className={style.period}>
          <div className={style.point}>20:00</div>
          <div className={style.description}>Sunset</div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
