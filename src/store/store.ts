import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {tasksReducer} from "./slices/tasks";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';



const rootReducer = combineReducers({
  tasks: tasksReducer,
})

const persistConfig = {
  key: 'pomodoro_box',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
