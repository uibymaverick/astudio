import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { store } from './index';

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<typeof store.getState> =
  useSelector;
