import React, {useEffect} from 'react';
import style from './App.module.scss';
import Calendar from './companents/calendar/Calendar';
import SearchField from './companents/searchfield/SearchField';
import Weather from './companents/weather/Weather';
import {useAppDispatch, useAppSelector} from './state/hooks';
import {fetchPlaceName, fetchWeatherData} from './state/weatherReducer';

function App() {
  const dispatch = useAppDispatch();
  const placeName = useAppSelector((state) => state.weather.placeName);
  console.log(placeName);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((res) => {
      const {latitude, longitude} = res.coords;
      dispatch(fetchPlaceName(longitude, latitude));
      if (placeName) {
        const address = placeName.split(',')[0];
        dispatch(fetchWeatherData(latitude, longitude, address));
      }
    });
  }, []);

  useEffect(() => {
    const expiresIn = localStorage.getItem('expiresIn');

    if (expiresIn) {
      const currentTimestamp = new Date().getTime();

      if (currentTimestamp >= +expiresIn) {
        localStorage.clear();
      }
    }
  });

  if (!placeName) {
    return null;
  }
  return (
    <div className={style.app}>
      <div className={style.container}>
        <Calendar />
        <SearchField placeName={placeName} />
        <Weather />
      </div>
    </div>
  );
}

export default App;
