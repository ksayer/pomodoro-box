import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {currentDate} from "../../utils/datetime";


export type DayStatistic = {
  finishedTasks: number,
  stops: number,
  workingTime: number,
  pauseTime: number,
  timeOnFinishedTasks: number,
}

export type Statistic = {
  days: {
    [key: string]: DayStatistic
  },
  selectedDay: string
}

const initialDayStatistic: DayStatistic = {
  finishedTasks: 0,
  stops: 0,
  workingTime: 0,
  pauseTime: 0,
  timeOnFinishedTasks: 0,
}

const initialState: Statistic = {
  days: {[currentDate()]: initialDayStatistic},
  selectedDay: currentDate()
}

const addDayStatistic = (state: Statistic) => {
  if (!state.days[currentDate()]) {
    state.days[currentDate()] = {...initialDayStatistic}
  }
}

const incrementByOne = ({state, field}: {state: Statistic, field: keyof DayStatistic}) => {
  addDayStatistic(state);
  state.days[currentDate()][field] += 1;
}

const incrementByValue = ({state, field, value}: {state: Statistic, field: keyof DayStatistic, value: number}) => {
  addDayStatistic(state);
  state.days[currentDate()][field] += value;
}

export const statisticSlice = createSlice({
  name: 'statistic',
  initialState,
  reducers: {
    incrementFinishedTasks: (state) => {
      incrementByOne({state, field: "finishedTasks"})
    },
    incrementStops: (state) => {
      incrementByOne({state, field: "stops"})
    },
    addWorkingTime: (state, action: PayloadAction<number>) => {
      incrementByValue({state, field: "workingTime", value: action.payload})
    },
    addPauseTime: (state, action: PayloadAction<number>) => {
      incrementByValue({state, field: "pauseTime", value: action.payload})
    },
    addTimeOnFinishedTasks: (state, action: PayloadAction<number>) => {
      incrementByValue({state, field: "timeOnFinishedTasks", value: action.payload})
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

export const getTodayStatistic = (state: RootState) => {
  return state.statistic.days[currentDate()] || {...initialDayStatistic}
};
export const getSelectedStatistic = (state: RootState) => state.statistic.days[state.statistic.selectedDay];

export const statisticReducer = statisticSlice.reducer;
