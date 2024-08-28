import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Theme } from "../../../types/types";

interface ThemeState {
  theme: Theme;
}

const initialState: ThemeState = {
  theme: Theme.Initial,
};

export const themeSlice = createSlice({
  name: "theme",

  initialState,

  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
export type { ThemeState };
