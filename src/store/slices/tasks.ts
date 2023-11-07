import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";


export type Task = {
  id: string,
  name: string,
  countPomodoro: number;
}

const initialState: Task[] = [];

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Task>) => {
      state.push(action.payload)
    }
  }
})


export const { add } = tasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks;

export const tasksReducer = tasksSlice.reducer;
