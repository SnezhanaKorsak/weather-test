import React from 'react';

import { changeTypeSearch } from '../../state/reducers/appReducer';
import { useAppDispatch, useAppSelector } from '../../hooks';

import style from './styled.module.scss';

const Toggle = () => {
  const dispatch = useAppDispatch();
  const typeSearch = useAppSelector((state) => state.app.typeForecastData);

  const changeAPI = () => {
    const value = typeSearch === 'daily' ? 'hourly' : 'daily';
    dispatch(changeTypeSearch(value));
  };

  const checked = typeSearch === 'daily';

  return (
    <div className={style.container}>
      <label className={style.switch} htmlFor="toggle">
        <input type="checkbox" id="toggle" onClick={changeAPI} checked={checked} hidden readOnly />
        <div className={style.track}>
          <div className={style.thumb} />
        </div>
      </label>
    </div>
  );
};

export default Toggle;
