import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchDataFromApi } from "../../utils/api";
import axios from "axios";
import {PORT} from "../../utils/config";

const url = `${PORT}/watchlist/api`;
const initialState = {
  movies: [],
  loading: true,
};

export const getWatchlistMovies = createAsyncThunk(
  "/watchlist",
  async({email,token}, thunkAPI) => {
    try {
      const res = await axios.get(url, {
        params: { email: email },
        headers: {
          "authorization": `Bearer ${token}`,
        },
      });

      const dataWatchlist = res.data;
      const movieList = [];

      // Use Promise.all to wait for all promises to resolve
      const promises = dataWatchlist.map((item) =>
        fetchDataFromApi(`/${item.media_type}/${item.id}`)
      );

      try {
        const movieDataArray = await Promise.all(promises);

        // Map over movieDataArray and add media_type property
        const enrichedMovieDataArray = movieDataArray.map((data, index) => ({
          ...data,
          media_type: dataWatchlist[index].media_type,
        }));

        movieList.push(...enrichedMovieDataArray.filter((data) => data)); // Filter out undefined values
        return movieList;
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("something went wrong...");
    }
  }
);

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    removeMovie: (state, action) => {
      state.loading = true; // Set loading to true initially
      const { id } = action.payload;
      const updatedItems = state.movies.filter((item) => item.id !== id);
      state.movies = updatedItems;

      state.loading = false; // Set loading to false after updating the movies array
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWatchlistMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWatchlistMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(getWatchlistMovies.rejected, (state, action) => {
        console.log(action); // use of thunkapi is here check payload of the object
        state.loading = false;
      });
  },
});

export const { addMovie, addMovieList, removeMovie } = watchlistSlice.actions;
export default watchlistSlice.reducer;
