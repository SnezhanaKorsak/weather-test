import React, {useEffect} from 'react';
import {shallowEqual} from 'react-redux';
import {useAppDispatch, useAppSelector} from '../../state/hooks';
import CurrentWeather from './current/CurrentWeather';
import DailyWeather from './dailyForecast/DailyWeather';
import style from './Weather.module.scss';
import HourlyForecast from './hourlyForecast/HourlyForecast';
import {generateKey} from '../../App';
import {fetchDailyWeather, fetchHourlyWeatherData, setDailyWeather, setHourlyWeather} from '../../state/weatherReducer';

function Weather() {
  const dispatch = useAppDispatch();
  const coordinates = useAppSelector((state) => state.weather.coordinates, shallowEqual);
  const typeSearch = useAppSelector((state) => state.app.typeForecastData, shallowEqual);

  useEffect(() => {
    if (coordinates && typeSearch && typeSearch === 'daily') {
      const key = generateKey(coordinates.latitude, coordinates.longitude, '_daily');
      const dataFromCache = localStorage.getItem(key);

      if (dataFromCache) {
        dispatch(setDailyWeather(JSON.parse(dataFromCache)));
      } else {
        const {latitude, longitude} = coordinates;
        dispatch(fetchDailyWeather(latitude, longitude));
      }
    }
    if (coordinates && typeSearch && typeSearch === 'hourly') {
      const key = generateKey(coordinates.latitude, coordinates.longitude, '_hourly');
      const dataFromCache = localStorage.getItem(key);

      if (dataFromCache) {
        dispatch(setHourlyWeather(JSON.parse(dataFromCache)));
      } else {
        const {latitude, longitude} = coordinates;
        dispatch(fetchHourlyWeatherData(latitude, longitude));
      }
    }
  }, [coordinates, typeSearch]);

  return (
    <div className={style.container}>
      <CurrentWeather />
      {typeSearch === 'daily' ? <DailyWeather /> : <HourlyForecast />}
    </div>
  );
}

export default Weather;
