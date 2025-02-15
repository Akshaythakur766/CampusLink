import { configureStore } from "@reduxjs/toolkit";
import appCoreSlice from "./coreSlice";

export const store = configureStore({
  reducer: {
    core: appCoreSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDisptch = typeof store.dispatch;
