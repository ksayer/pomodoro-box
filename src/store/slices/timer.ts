import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { POMODORO_DURATION_MINUTES } from '../../constants';

export type TStatus = 'isWork' | 'isStop' | 'isPause';

export type TimerStore = {
  status: TStatus;
  isBreak: boolean;
  seconds: number;
};

const initialState: TimerStore = {
  status: 'isStop',
  isBreak: false,
  seconds: POMODORO_DURATION_MINUTES * 60,
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<TStatus>) => {
      state.status = action.payload;
    },
    setSeconds: (state, action: PayloadAction<number>) => {
      state.seconds = action.payload;
    },
    toggleIsBreak: state => {
      state.isBreak = !state.isBreak;
    },
  },
});

export const { setStatus, setSeconds, toggleIsBreak } = timerSlice.actions;

export const getTimerStatus = (state: RootState) => state.timer.status;
export const getTimerStore = (state: RootState) => state.timer;

export const timerReducer = timerSlice.reducer;
