import React, { useEffect } from 'react';

import WeatherContainer from '../companents/weather/WeatherContainer';
import Calendar from '../companents/Calendar';
import SearchField from '../companents/Searchfield';

import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchCurrentLocationByCoordinates } from '../state/weatherReducer';
import { getBackgroundImg } from '../helpers';

import style from './styled.module.scss';

const App = () => {
  const dispatch = useAppDispatch();

  const location = useAppSelector((state) => state.weather.currentLocation);
  const weathers = useAppSelector((state) => state.weather.currentWeathers);

  useEffect(() => {
    if (!location) {
      navigator.geolocation.getCurrentPosition((res) => {
        const { latitude, longitude } = res.coords;
        dispatch(fetchCurrentLocationByCoordinates(longitude, latitude));
      });
    }
  }, []);

  useEffect(() => {
    const expireIn = localStorage.getItem('expireIn');

    if (expireIn) {
      const currentTimestamp = new Date().getTime();

      if (currentTimestamp >= +expireIn) {
        localStorage.clear();
      }
    }
  });

  const currentWeather = weathers.find((item) => item.id === location?.name);

  const icon = currentWeather?.weather[0].icon;
  const backgroundImg = getBackgroundImg(icon);

  return (
    <div className={style.app} style={backgroundImg}>
      <div className={style.container}>
        <Calendar />
        <SearchField />
        <WeatherContainer />
      </div>
    </div>
  );
};

export default App;
