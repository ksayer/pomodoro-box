import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";


export type TimerStore = {
  finishedTasks: number,
  stops: number,
  workingTime: number,
  pauseTime: number,
  timeOnFinishedTasks: number,
  isRunning: boolean,
  isPause: boolean,
}

const initialState: TimerStore = {
  finishedTasks: 0,
  stops: 0,
  pauseTime: 0,
  workingTime: 0,
  timeOnFinishedTasks: 0,
  isRunning: false,
  isPause: false,
}

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    incrementFinishedTasks: (state) => {
      state.finishedTasks += 1
    },
    incrementStops: (state) => {
      state.stops += 1
    },
    addWorkingTime: (state, action: PayloadAction<number>) => {
      state.workingTime += action.payload
    },
    addPauseTime: (state, action: PayloadAction<number>) => {
      state.pauseTime += action.payload
    },
    addTimeOnFinishedTasks: (state, action: PayloadAction<number>) => {
      state.timeOnFinishedTasks += action.payload
    },
    setIsRunning: (state, action: PayloadAction<boolean>) => {
      state.isRunning = action.payload;
    },
    setIsPause: (state, action: PayloadAction<boolean>) => {
      state.isPause = action.payload;
    }
  }
})


export const {
  incrementFinishedTasks,
  incrementStops,
  addPauseTime,
  addWorkingTime,
  addTimeOnFinishedTasks,
  setIsRunning,
  setIsPause,
} = timerSlice.actions;

export const getTimerStore = (state: RootState) => state.timer;

export const timerReducer = timerSlice.reducer;
