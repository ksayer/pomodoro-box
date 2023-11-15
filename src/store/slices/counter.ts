import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";


export type GlobalCounter = {
  finishedTasks: number,
  stops: number,
  workingTime: number,
  pauseTime: number,
}

const initialState: GlobalCounter = {finishedTasks: 0, stops: 0, pauseTime: 0, workingTime: 0}

export const globalCounterSlice = createSlice({
  name: 'globalCounter',
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
  }
})


export const { incrementFinishedTasks, incrementStops, addPauseTime, addWorkingTime } = globalCounterSlice.actions;

export const getGlobalCounter = (state: RootState) => state.globalCounter;

export const globalCounterReducer = globalCounterSlice.reducer;
