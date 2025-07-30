import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboard/slice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
  },
});
