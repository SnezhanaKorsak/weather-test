import React, {useEffect, useState} from 'react';
import debounce from 'lodash.debounce';
import {useAppDispatch, useAppSelector} from '../../state/hooks';
import {fetchCoordinates, fetchPlaceName, fetchWeatherData, setWeatherDataFromCache} from '../../state/weatherReducer';
import style from './SearchField.module.scss';

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
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    dispatch(fetchCoordinates(address));
  }, [address]);

  const changeHandlerDebounced = debounce((value: string) => {
    setAddress(value);
  }, 1000);

  const sendRequest = () => {
    setDisabled(true);
    const weatherDataFromCache = localStorage.getItem(address);

    if (weatherDataFromCache) {
      dispatch(setWeatherDataFromCache(JSON.parse(weatherDataFromCache)));
      setDisabled(false);
    } else if (coordinates) {
      const {latitude, longitude} = coordinates;
      dispatch(fetchPlaceName(longitude, latitude));
      dispatch(fetchWeatherData(latitude, longitude));
      setDisabled(false);
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
        <input
          type="text"
          placeholder={address}
          onChange={(event) => changeHandlerDebounced(event.currentTarget.value)}
          onKeyPress={pressHandler}
        />
        <button type="button" onClick={sendRequest} disabled={disabled}>
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchField;
