import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";


type SettingsTheme = 'dark' | 'light';

export type Settings = {
  theme: SettingsTheme,
}

const initialState: Settings = {
  theme: 'light',
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
  }
})


export const {
  toggleTheme,
} = settingsSlice.actions;

export const getSettings = (state: RootState) => state.settings;

export const settingsReducer = settingsSlice.reducer;
