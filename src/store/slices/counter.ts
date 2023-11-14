import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store";


export type GlobalCounter = {
  finishedTasks: number,
  stops: number,
}

const initialState: GlobalCounter = {finishedTasks: 0, stops: 0}

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
    reset: (state) => {
      state.finishedTasks = 0;
    }
  }
})


export const { incrementFinishedTasks, incrementStops } = globalCounterSlice.actions;

export const getGlobalCounter = (state: RootState) => state.globalCounter;

export const globalCounterReducer = globalCounterSlice.reducer;
