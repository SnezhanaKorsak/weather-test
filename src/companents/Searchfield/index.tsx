import React, { useState } from 'react';
import debounce from 'lodash.debounce';

import Toggle from '../Toggle';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCurrentLocationByPlaceName } from '../../state/weatherReducer';

import style from './styled.module.scss';

const SearchField = () => {
  const dispatch = useAppDispatch();

  const currentLocation = useAppSelector((state) => state.weather.currentLocation);

  const [address, setAddress] = useState('');

  const cityName = currentLocation?.name;
  const countryName = currentLocation?.country;

  const sendRequest = () => {
    if (address) {
      dispatch(fetchCurrentLocationByPlaceName(address));
    }
  };
  const changeHandlerDebounced = debounce((value: string) => {
    setAddress(value);
  }, 1000);

  const pressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendRequest();
    }
  };

  return (
    <div className={style.container}>
      <div className={style.location}>
        <span className={style.city}>{`${cityName}, ${countryName}`}</span>
      </div>
      <div className={style.search}>
        <input
          type="text"
          onChange={(event) => changeHandlerDebounced(event.currentTarget.value)}
          onKeyPress={pressHandler}
        />
        <button type="button" onClick={sendRequest}>
          Search
        </button>
      </div>
      <div className={style.toggle}>
        HOUR
        <Toggle />
        DAY
      </div>
    </div>
  );
};

export default SearchField;
