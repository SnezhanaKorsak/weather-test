import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, AppRootState } from '../state/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;

export const useWeatherLocation = () => {
  const location = useAppSelector((state) => state.weather.currentLocation);
  const { currentWeathers, dailyWeathers, hourlyWeathers } = useAppSelector((state) => state.weather);

  const getWeather = <T extends { id: string }>(weather: T[]) => weather.find((item) => item.id === location?.name);

  return {
    currentWeather: getWeather(currentWeathers),
    dailyWeather: getWeather(dailyWeathers),
    hourlyWeather: getWeather(hourlyWeathers),
    location,
  };
};
