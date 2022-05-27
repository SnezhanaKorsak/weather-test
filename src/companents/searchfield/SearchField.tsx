import React from 'react';
import style from './SearchField.module.scss';

function SearchField() {
  return (
    <div className={style.container}>
      <div className={style.location}>
        <span className={style.city}>Minsk</span>
        <span className={style.country}>Belarus</span>
      </div>
      <input className={style.search} type="text" value="Minsk" />
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
