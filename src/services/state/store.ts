import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme/themeSlice";
import gridReducer from "./grid/gridSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    grid: gridReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
