import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";


export type TaskType = {
  id: string,
  name: string,
  countPomodoro: number;
}

const initialState: TaskType[] = [];

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addNewTask: (state, action: PayloadAction<TaskType>) => {
      state.push(action.payload)
    },
    removeTask: (state, action: PayloadAction<{id: string}>) => {
      return state.filter((item) => {
        if (item.id !== action.payload.id) {
          return item
        }
      })
    },
    updateTaskName: (state, action: PayloadAction<{id: string, name: string}>) => {
      return state.map((item) => {
        if (item.id == action.payload.id) {
          console.log(1)
          return {...item, name: action.payload.name}
        }
        else {
          return item
        }
      })
    },
    updateCountPomodoro: (state, action: PayloadAction<{id: string, number: number}>) => {
      return state.map((item) => {
        if (item.id == action.payload.id) {
          return {...item, countPomodoro: item.countPomodoro + action.payload.number}
        }
        else {
          return item
        }
      })
    }
  }
})


export const { addNewTask, removeTask, updateTaskName, updateCountPomodoro } = tasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks;

export const tasksReducer = tasksSlice.reducer;
