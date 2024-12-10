import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storageSession from 'reduxjs-toolkit-persist/lib/storage/session';
import autoMergeLevel1 from 'reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1';
import API from '@/utils/API';

import rootReducer from './reducers/index.js';

const persistConfig = {
  key: 'root',
  storage: storageSession,
  version: 1,
  whitelist: ['auth', 'role'], // Add 'role' to the whitelist
  stateReconciler: autoMergeLevel1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(),
  // eslint-disable-next-line no-undef
  devTools: process.env.NODE_ENV !== 'production',
});

store.subscribe(listener);

function select(state) {
  return state.auth?.user?.token;
}

function listener() {
  let token = select(store.getState());
  API.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}

const persistor = persistStore(store);

export { store, persistor };
