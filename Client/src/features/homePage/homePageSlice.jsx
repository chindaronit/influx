import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: {},
  genres: {},
  isLoading: true,
};

const homePageSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    getApiConfiguration: (state, action) => {
      state.url = action.payload;
    },
    getGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
 });

export const { getApiConfiguration, getGenres } = homePageSlice.actions;
export default homePageSlice.reducer;
