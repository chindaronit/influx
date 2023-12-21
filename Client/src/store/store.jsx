import { configureStore } from "@reduxjs/toolkit";
import homePageSlice from "../features/homePage/homePageSlice";

export const store = configureStore({
  reducer: {
    homePage:homePageSlice
  },
});
