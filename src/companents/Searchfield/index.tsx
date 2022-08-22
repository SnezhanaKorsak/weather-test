import React, { ChangeEvent, useState } from 'react';

import Toggle from '../Toggle';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchLocationByAddress } from '../../state/sagas/weatherSaga';

import style from './styled.module.scss';

const SearchField = () => {
  const dispatch = useAppDispatch();

  const currentLocation = useAppSelector((state) => state.weather.currentLocation);

  const [address, setAddress] = useState('');

  const cityName = currentLocation?.name;
  const countryName = currentLocation?.country;

  const sendRequest = () => {
    if (address) {
      dispatch(fetchLocationByAddress(address));
    }
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => setAddress(event.currentTarget.value);

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
        <input type="text" onChange={changeHandler} onKeyPress={pressHandler} />
        <button type="button" onClick={sendRequest}>
          Search
        </button>
      </div>
      <Toggle />
    </div>
  );
};

export default SearchField;
