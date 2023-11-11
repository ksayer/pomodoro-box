import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";


export type TaskType = {
  id: string,
  name: string,
  countPomodoro: number,
  active?: boolean,
}

const initialState: TaskType[] = [];

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addNewTask: (state, action: PayloadAction<TaskType>) => {
      state.push({...action.payload, active: false})
    },
    removeTask: (state, action: PayloadAction<{id: string}>) => {
      return state.filter((item) => {
        if (item.id !== action.payload.id) {
          return item
        }
      })
    },
    moveTasks: (state, action: PayloadAction<{ activeId: string; overId: string }>) => {
      const index1 = state.findIndex((task) => task.id === action.payload.activeId);
      const index2 = state.findIndex((task) => task.id === action.payload.overId);
      const movedTask = state.splice(index1, 1)[0];
      state.splice(index2, 0, movedTask);
    },
    updateTask: (state, action: PayloadAction<TaskType> ) => {
      return state.map((task) => {
        return task.id === action.payload.id ? action.payload : task;
      })
    }
  }
})


export const { addNewTask, removeTask, moveTasks, updateTask } = tasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks;

export const tasksReducer = tasksSlice.reducer;
