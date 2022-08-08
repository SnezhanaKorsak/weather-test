import React, { useEffect } from 'react';

import WeatherContainer from '../companents/weather/WeatherContainer';
import Calendar from '../companents/Calendar';
import SearchField from '../companents/Searchfield';

import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchCurrentWeather, fetchPlaceName, setCurrentWeather } from '../state/weatherReducer';
import { generateKey, getBackgroundImg } from '../helpers';

import style from './styled.module.scss';

const App = () => {
  const dispatch = useAppDispatch();
  const placeName = useAppSelector((state) => state.weather.placeName);
  const icon = useAppSelector((state) => state.weather.currentWeather?.weather[0].icon);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((res) => {
      const { latitude, longitude } = res.coords;
      dispatch(fetchPlaceName(longitude, latitude));

      const key = generateKey(latitude, longitude, '_current');
      const dataFromCache = localStorage.getItem(key);

      if (dataFromCache) {
        dispatch(setCurrentWeather(JSON.parse(dataFromCache)));
      } else {
        dispatch(fetchCurrentWeather(latitude, longitude));
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

  const backgroundImg = getBackgroundImg(icon);

  return (
    <div className={style.app} style={backgroundImg}>
      <div className={style.container}>
        <Calendar />
        <SearchField placeName={placeName} />
        <WeatherContainer />
      </div>
    </div>
  );
};

export default App;
