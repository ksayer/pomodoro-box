import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

export type TimerStore = {
  isRunning: boolean,
  isPause: boolean,
}

const initialState: TimerStore = {
  isRunning: false,
  isPause: false,
}


export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setIsRunning: (state, action: PayloadAction<boolean>) => {
      state.isRunning = action.payload;
    },
    setIsPause: (state, action: PayloadAction<boolean>) => {
      state.isPause = action.payload;
    }
  }
})


export const {
  setIsRunning,
  setIsPause,
} = timerSlice.actions;

export const getTimerStore = (state: RootState) => state.timer;

export const timerReducer = timerSlice.reducer;
