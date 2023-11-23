import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";


const currentDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0]
}

export type DayStatistic = {
  finishedTasks: number,
  stops: number,
  workingTime: number,
  pauseTime: number,
  timeOnFinishedTasks: number,
}

const initialDayStatistic: DayStatistic = {
  finishedTasks: 0,
  stops: 0,
  workingTime: 0,
  pauseTime: 0,
  timeOnFinishedTasks: 0,
}

export type Statistic = {
  days: {
    [key: string]: DayStatistic
  },
  selectedDay: string
}

const initialState: Statistic = {
  days: {[currentDate()]: initialDayStatistic},
  selectedDay: currentDate()
}

export const statisticSlice = createSlice({
  name: 'statistic',
  initialState,
  reducers: {
    incrementFinishedTasks: (state) => {
      state.days[currentDate()].finishedTasks += 1
    },
    incrementStops: (state) => {
      state.days[currentDate()].stops += 1
    },
    addWorkingTime: (state, action: PayloadAction<number>) => {
      state.days[currentDate()].workingTime += action.payload
    },
    addPauseTime: (state, action: PayloadAction<number>) => {
      state.days[currentDate()].pauseTime += action.payload
    },
    addTimeOnFinishedTasks: (state, action: PayloadAction<number>) => {
      state.days[currentDate()].timeOnFinishedTasks += action.payload
    },
  }
})


export const {
  incrementFinishedTasks,
  incrementStops,
  addPauseTime,
  addWorkingTime,
  addTimeOnFinishedTasks,
} = statisticSlice.actions;

export const getStatistic = (state: RootState) => state.statistic;
export const getSelectedStatistic = (state: RootState) => state.statistic.days[state.statistic.selectedDay];

export const statisticReducer = statisticSlice.reducer;
