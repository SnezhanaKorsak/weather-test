import React, {useEffect} from 'react';
import Calendar from './companents/calendar/Calendar';
import SearchField from './companents/searchfield/SearchField';
import {useAppDispatch, useAppSelector} from './state/hooks';
import {fetchCurrentWeather, fetchPlaceName, setCurrentWeather} from './state/weatherReducer';
import style from './App.module.scss';
import clearImg from './assets/images/clear.jpg';
import stormImg from './assets/images/thunderstorm.jpg';
import drizzleImg from './assets/images/drizzle.jpg';
import rainImg from './assets/images/rain.jpg';
import snowImg from './assets/images/snow.jpg';
import fogImg from './assets/images/fog.jpg';
import cloudsImg from './assets/images/clouds.jpg';
import Weather from './companents/weather/Weather';

export const generateKey = (latitude: number, longitude: number, id: string) =>
  `${latitude.toFixed(2)},${longitude.toFixed(2)}${id}`;

function App() {
  const dispatch = useAppDispatch();
  const placeName = useAppSelector((state) => state.weather.placeName);
  const icon = useAppSelector((state) => state.weather.currentWeather?.weather[0].icon);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((res) => {
      const {latitude, longitude} = res.coords;
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

  const backgroundList = [
    {icon: '01d', img: {backgroundImage: `url(${clearImg})`}},
    {icon: '02d', img: {backgroundImage: `url(${cloudsImg})`}},
    {icon: '03d', img: {backgroundImage: `url(${cloudsImg})`}},
    {icon: '04d', img: {backgroundImage: `url(${cloudsImg})`}},
    {icon: '09d', img: {backgroundImage: `url(${drizzleImg})`}},
    {icon: '10d', img: {backgroundImage: `url(${rainImg})`}},
    {icon: '11d', img: {backgroundImage: `url(${stormImg})`}},
    {icon: '13d', img: {backgroundImage: `url(${snowImg})`}},
    {icon: '50d', img: {backgroundImage: `url(${fogImg})`}},
  ];

  const key = icon ? `${icon.slice(0, 2)}d` : '01d';
  const currentImg = backgroundList.find((item) => item.icon === key);
  const backgroundImg = currentImg ? currentImg.img : {backgroundImage: `url(${clearImg})`};

  return (
    <div className={style.app} style={backgroundImg}>
      <div className={style.container}>
        <Calendar />
        <SearchField placeName={placeName} />
        <Weather />
      </div>
    </div>
  );
}

export default App;
