import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchDataFromApi } from "../../utils/api";
import axios from "axios";
import { RPORT } from "../../utils/config";

const url = `${RPORT}`;
const initialState = {
  movies: [],
  loading: true,
};

export const fetchRecommendations = createAsyncThunk(
  "/recommendations",
  async ({ moviesIdList }, thunkAPI) => {
    try {
      console.log(moviesIdList);
      const promisesMovies = moviesIdList?.map((item) =>
        axios.get(url, {
          params: { movieId: item },
        })
      );

      const movies = await Promise.all(promisesMovies);
      const movieList = [];
      const processedMovieIds = new Set();

      const promises = movies.map(async (item) => {
        const values = item?.data?.movies?.map(async (movieId) => {
          if (!processedMovieIds.has(movieId)) {
            processedMovieIds.add(movieId);
            const movieData = await fetchDataFromApi(`/movie/${movieId}`);
            return movieData;
          }
        });

        const movieDataArray = await Promise.all(values);
        movieList.push(...movieDataArray.filter((data) => data));
      });

      // Wait for all promises to resolve
      await Promise.all(promises);

      // Now movieList contains unique movie data

      return movieList;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("something went wrong...");
    }
  }
);

const recommendationSlice = createSlice({
  name: "recommendation",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        console.log(action); // use of thunkapi is here check payload of the object
        state.loading = false;
      });
  },
});

export default recommendationSlice.reducer;
