import { applyMiddleware, compose, createStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { persistReducer, persistStore } from 'redux-persist';
import { createStateSyncMiddleware } from 'redux-state-sync';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
  stateReconciler: autoMergeLevel2
};

const stateSyncConfig = {
  blacklist: ['persist/PERSIST']
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const middlewares = [createStateSyncMiddleware(stateSyncConfig)];

  return createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk), applyMiddleware(...middlewares))
  );
};

export const store = configureStore();
export const persistor = persistStore(store);
