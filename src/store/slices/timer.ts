import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {POMODORO_MINUTES} from "../../constants";


export type TimerState = {
  seconds: number
}

const initialState: TimerState = {seconds: POMODORO_MINUTES * 5}

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    reduceSecond: (state) => {
      state.seconds -= 1;
    },
    resetTime: () => {
      return  initialState
    }
  }
})

export const { reduceSecond, resetTime} = timerSlice.actions;

export const getTimer = (state: RootState) => state.timer;

export const timerReducer = timerSlice.reducer;
