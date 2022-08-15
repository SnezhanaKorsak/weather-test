import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';

import { weatherReducer } from './reducers/weatherReducer';
import { appReducer } from './reducers/appReducer';
import { calendarReducer } from './reducers/calendarReducer';

import { rootSaga } from './sagas';

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['calendar'],
};

const calendarPersistConfig = {
  key: 'calendar',
  storage,
  blacklist: ['isAuth'],
};

export const rootReducer = combineReducers({
  weather: weatherReducer,
  app: appReducer,
  calendar: persistReducer(calendarPersistConfig, calendarReducer),
});

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware, logger),
});

export const persistor = persistStore(store);

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

sagaMiddleware.run(rootSaga);
