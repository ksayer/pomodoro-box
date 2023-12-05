import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type TaskType = {
  id: string;
  name: string;
  countPomodoro: number;
  finishedPomodoro: number;
  active?: boolean;
  workingSecondsLastTask: number;
  fake: boolean;
};

const initialState: TaskType[] = [];

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addNewTask: (state, action: PayloadAction<TaskType>) => {
      state.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<{ id: string }>) =>
      state.filter(item => {
        return item.id !== action.payload.id;
      }),
    moveTasks: (state, action: PayloadAction<{ activeId: string; overId: string }>) => {
      const index1 = state.findIndex(task => task.id === action.payload.activeId);
      const index2 = state.findIndex(task => task.id === action.payload.overId);
      const movedTask = state.splice(index1, 1)[0];
      state.splice(index2, 0, movedTask);
    },
    updateTask: (state, action: PayloadAction<TaskType>) => {
      return state.map(task => {
        return task.id === action.payload.id ? action.payload : task;
      });
    },
    incrementWorkingSecondsLastTask: state => {
      return state.map((task, index) => {
        return index === 0
          ? {
              ...task,
              workingSecondsLastTask: task.workingSecondsLastTask + 1000,
            }
          : task;
      });
    },
    updateStatus: (state, action: PayloadAction<{ id: string; active: boolean }>) => {
      return state.map(task => {
        return task.id === action.payload.id ? { ...task, active: action.payload.active } : task;
      });
    },
    deactivateTasks: state => {
      return state.map(task => ({ ...task, active: false }));
    },
  },
});

export const {
  addNewTask,
  removeTask,
  moveTasks,
  updateTask,
  deactivateTasks,
  updateStatus,
  incrementWorkingSecondsLastTask,
} = tasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks;

export const selectRealTasks = (state: RootState) => state.tasks.filter(task => !task.fake);

export const tasksReducer = tasksSlice.reducer;
