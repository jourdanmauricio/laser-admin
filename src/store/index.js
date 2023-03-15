import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import userReducer from './user';
import settingsReducer from './settings';
import postsReducer from './posts';
import sectionsReducer from './sections';
import clinicsReducer from './clinics';

const reducer = combineReducers({
  user: userReducer,
  settings: settingsReducer,
  posts: postsReducer,
  sections: sectionsReducer,
  clinics: clinicsReducer,
});

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['user', 'settings'],
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
