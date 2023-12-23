import { configureStore } from "@reduxjs/toolkit";
import homePageSlice from "../features/homePage/homePageSlice";
import watchlistSlice from "../features/watchlist/watchlistSlice";
import Subscription from "../features/subscription/Subscription";

export const store = configureStore({
  reducer: {
    homePage: homePageSlice,
    watchlist: watchlistSlice,
    subscription: Subscription
  },
});
