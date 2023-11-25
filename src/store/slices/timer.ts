import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

export type TStatus = 'isWork' | 'isStop' | 'isPause';

export type TimerStore = {
  status: TStatus,
}

const initialState: TimerStore = {
  status: 'isStop',
}


export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<TStatus>) => {
      state.status = action.payload;
    },
  }
})


export const {
  setStatus,
} = timerSlice.actions;

export const getTimerStatus = (state: RootState) => state.timer.status;

export const timerReducer = timerSlice.reducer;
