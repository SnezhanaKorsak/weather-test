import React, {useEffect, useState} from 'react';
import style from './SearchField.module.scss';
import {useAppDispatch, useAppSelector} from '../../state/hooks';
import {fetchCoordinates, fetchPlaceName, fetchWeatherData, setWeatherDataFromCache} from '../../state/weatherReducer';

type SearchFieldProps = {
  placeName: string;
};

function SearchField({placeName}: SearchFieldProps) {
  const cityName = placeName.split(',')[0];
  const index = placeName.split(',').length - 1;
  const countryName = placeName.split(',')[index];

  const dispatch = useAppDispatch();
  const coordinates = useAppSelector((state) => state.weather.coordinates);

  const [address, setAddress] = useState(placeName.split(',')[0]);

  useEffect(() => {
    dispatch(fetchCoordinates(address));
  }, [address, dispatch]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.currentTarget.value);
  };

  const sendRequest = () => {
    const weatherDataFromCache = localStorage.getItem(address);

    if (weatherDataFromCache) {
      dispatch(setWeatherDataFromCache(JSON.parse(weatherDataFromCache)));
    } else if (coordinates) {
      const {latitude, longitude} = coordinates;
      dispatch(fetchPlaceName(longitude, latitude));
      dispatch(fetchWeatherData(latitude, longitude, address));
    }
  };

  const pressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendRequest();
    }
  };

  return (
    <div className={style.container}>
      <div className={style.location}>
        <span className={style.city}>{cityName}</span>
        <span className={style.country}>{countryName}</span>
      </div>
      <div className={style.search}>
        <input type="text" value={address} onChange={changeHandler} onKeyPress={pressHandler} />
        <button type="button" onClick={sendRequest}>
          Search
        </button>
      </div>
      <div className={style.searchType}>
        <span className={style.label}>Weather services</span>
        <div className={style.radio}>
          <input type="radio" name="services" value="openweather" checked />
          openWeather
        </div>

        <div className={style.radio}>
          <input type="radio" name="services" value="stormglass" />
          stormGlass
        </div>
      </div>
    </div>
  );
}

export default SearchField;
