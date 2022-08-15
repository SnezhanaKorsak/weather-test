import React, { useEffect } from 'react';

import WeatherContainer from '../companents/weather/WeatherContainer';
import Calendar from '../companents/Calendar';
import SearchField from '../companents/Searchfield';

import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchLocationByCoordinates } from '../state/sagas/weatherSaga';
import { getBackgroundImg } from '../helpers';

import style from './styled.module.scss';

const App = () => {
  const dispatch = useAppDispatch();
  const location = useAppSelector((state) => state.weather.currentLocation);
  const weathers = useAppSelector((state) => state.weather.currentWeathers);
  const expireTime = useAppSelector((state) => state.app.expireTime);

  useEffect(() => {
    if (expireTime) {
      const currentTimestamp = new Date().getTime();

      if (currentTimestamp >= expireTime) {
        localStorage.clear();
      }
    }
  });

  useEffect(() => {
    if (!location) {
      navigator.geolocation.getCurrentPosition((res) => {
        const { latitude, longitude } = res.coords;
        dispatch(fetchLocationByCoordinates(longitude, latitude));
      });
    }
  }, []);

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
