import { configureStore } from "@reduxjs/toolkit";
import homePageSlice from "../features/homePage/homePageSlice";
import watchlistSlice from "../features/Specifics/watchlistSlice";
import likedSlice from "../features/Specifics/likedSlice";
import favouriteSlice from "../features/Specifics/favouriteSlice";
import historySlice from "../features/Specifics/historySlice";
import Subscription from "../features/subscription/Subscription";
import authSlice from "../features/auth/authSlice";
import commentSlice from "../features/Comments/commentSlice";
import recommendationSlice from "../features/Recommendations/recommendationSlice";

export const store = configureStore({
  reducer: {
    homePage: homePageSlice,
    watchlist: watchlistSlice,
    subscription: Subscription,
    authSlice: authSlice,
    liked: likedSlice,
    favourite: favouriteSlice,
    history: historySlice,
    comments: commentSlice,
    recommendation: recommendationSlice,
  },
});
