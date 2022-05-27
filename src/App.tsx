import React from 'react';
import style from './App.module.scss';
import Calendar from './companents/calendar/Calendar';
import SearchField from './companents/searchfield/SearchField';
import Weather from './companents/weather/Weather';

function App() {
  return (
    <div className={style.app}>
      <div className={style.container}>
        <Calendar />
        <SearchField />
        <Weather />
      </div>
    </div>
  );
}

export default App;
