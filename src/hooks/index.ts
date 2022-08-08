import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppRootState, AppDispatch } from '../state/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;
