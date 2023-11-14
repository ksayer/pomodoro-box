import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";


export type GlobalCounter = {
  finishedTasks: number
}

const initialState: GlobalCounter = {finishedTasks: 0}

export const globalCounterSlice = createSlice({
  name: 'globalCounter',
  initialState,
  reducers: {
    updateGlobalCounter: (state, action: PayloadAction<GlobalCounter>) => {
      return {...state, ...action.payload}
    },
    reset: (state) => {
      state.finishedTasks = 0;
    }
  }
})


export const { updateGlobalCounter } = globalCounterSlice.actions;

export const getGlobalCounter = (state: RootState) => state.globalCounter;

export const globalCounterReducer = globalCounterSlice.reducer;
