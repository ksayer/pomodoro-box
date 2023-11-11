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
    },
    moveTasks: (state, action: PayloadAction<{ activeId: string; overId: string }>) => {
      const index1 = state.findIndex((task) => task.id === action.payload.activeId);
      const index2 = state.findIndex((task) => task.id === action.payload.overId);
      const movedTask = state.splice(index1, 1)[0];
      state.splice(index2, 0, movedTask);
    }
  }
})


export const { addNewTask, removeTask, updateTaskName, updateCountPomodoro, moveTasks } = tasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks;

export const tasksReducer = tasksSlice.reducer;
