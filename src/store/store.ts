import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants';
import { tasksReducer } from './slices/tasks';
import { timerReducer } from './slices/timer';
import { statisticReducer } from './slices/statistic';
import { settingsReducer } from './slices/settings';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  timer: timerReducer,
  statistic: statisticReducer,
  settings: settingsReducer,
});

const persistConfig = { key: 'pomodoro_box', storage };

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
