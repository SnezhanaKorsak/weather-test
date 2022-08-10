import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { weatherReducer } from './weatherReducer';
import { appReducer } from './appReducer';

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['weather'],
};

const weatherPersistConfig = {
  key: 'weather',
  storage,
  blacklist: ['currentLocation'],
};

const rootReducer = combineReducers({
  weather: persistReducer(weatherPersistConfig, weatherReducer),
  app: appReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
