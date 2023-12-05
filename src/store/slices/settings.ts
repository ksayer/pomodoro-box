import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {
  BREAK_DURATION_MINUTES,
  LONG_BREAK_DURATION_MINUTES,
  POMODORO_BETWEEN_LONG_BREAK,
  POMODORO_DURATION_MINUTES,
} from '../../constants';

type SettingsTheme = 'dark' | 'light';

export type Settings = {
  theme: SettingsTheme;
  pomodoroDurationMinutes: number;
  shortBreakDurationMinutes: number;
  longBreakDurationMinutes: number;
  pomodoroBetweenLongBreak: number;
  enableNotification: boolean;
};

const initialState: Settings = {
  theme: 'light',
  pomodoroDurationMinutes: POMODORO_DURATION_MINUTES,
  shortBreakDurationMinutes: BREAK_DURATION_MINUTES,
  longBreakDurationMinutes: LONG_BREAK_DURATION_MINUTES,
  pomodoroBetweenLongBreak: POMODORO_BETWEEN_LONG_BREAK,
  enableNotification: true,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleTheme: state => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
    updatePomodoroDurationMinutes: (state, action: PayloadAction<number>) => {
      state.pomodoroDurationMinutes = action.payload;
    },
    updateShortBreakDurationMinutes: (state, action: PayloadAction<number>) => {
      state.shortBreakDurationMinutes = action.payload;
    },
    updateSettings: (state, action: PayloadAction<object>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const {
  toggleTheme,
  updateSettings,
  updatePomodoroDurationMinutes,
  updateShortBreakDurationMinutes,
} = settingsSlice.actions;

export const selectSettings = (state: RootState) => state.settings;

export const settingsReducer = settingsSlice.reducer;
