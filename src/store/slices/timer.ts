import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {POMODORO_MINUTES} from "../../constants";


export type TimerState = {
  seconds: number
}

const initialState: TimerState = {seconds: POMODORO_MINUTES * 60}

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    reduce: (state) => {
      state.seconds -= 1;
    },
    reset: () => {
      return  initialState
    }
  }
})

export const { reduce, reset} = timerSlice.actions;

export const getTimer = (state: RootState) => state.timer;

export const timerReducer = timerSlice.reducer;
