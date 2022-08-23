import React, { useEffect } from 'react';

import WeatherContainer from '@/components/weather/WeatherContainer';
import Calendar from '@/components/Calendar';
import SearchField from '@/components/Searchfield';

import { persistor } from '@/store';
import { useAppDispatch, useAppSelector, useWeatherLocation } from '@/hooks';
import { getBackgroundImg } from '@/helpers';
import { fetchLocationByCoordinates } from '@/sagas/weatherSaga';

import style from './styled.module.scss';

const App = () => {
  const dispatch = useAppDispatch();
  const expireTime = useAppSelector((state) => state.app.expireTime);
  const { currentWeather, location } = useWeatherLocation();

  useEffect(() => {
    if (expireTime) {
      const currentTimestamp = new Date().getTime();

      if (currentTimestamp >= expireTime) {
        persistor.purge();
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
  }, [expireTime]);

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
