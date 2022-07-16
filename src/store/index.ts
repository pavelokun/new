import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
  ConfigureStoreOptions,
} from '@reduxjs/toolkit';
import moviesReducer from './reducers/moviesSlice';
import searchedMoviesReducer from './reducers/searchedMoviesSlice';

const rootReducer = combineReducers({
  movies: moviesReducer,
  searchedMovies: searchedMoviesReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['movies'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      // https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistedStore = persistStore(store);

// is a separate function so it can be used in `test-utils.tsx`
export const storeCreator = (params: Partial<ConfigureStoreOptions> = {}) =>
  configureStore({
    reducer: rootReducer,
    devTools: __DEV__ && !process.env.JEST_WORKER_ID,
    ...params,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
