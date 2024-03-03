import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchDataFromApi } from "../../utils/api";
import axios from "axios";
import { PORT } from "../../utils/config";

const url = `${PORT}/liked/api`;
const initialState = {
  movies: [],
  loading: true,
};

export const getLikedMovies = createAsyncThunk(
  "/liked",
  async ({ email, token }, thunkAPI) => {
    try {
      const res = await axios.get(url, {
        params: { email: email },
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const dataLiked = res.data;
      const movieList = [];

      // Use Promise.all to wait for all promises to resolve
      const promises = dataLiked.map((item) =>
        fetchDataFromApi(`/${item.media_type}/${item.id}`)
      );

      try {
        const movieDataArray = await Promise.all(promises);

        // Map over movieDataArray and add media_type property
        const enrichedMovieDataArray = movieDataArray.map((data, index) => ({
          ...data,
          media_type: dataLiked[index].media_type,
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

const likedSlice = createSlice({
  name: "liked",
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
      .addCase(getLikedMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLikedMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(getLikedMovies.rejected, (state, action) => {
        console.log(action); // use of thunkapi is here check payload of the object
        state.loading = false;
      });
  },
});

export const { addMovie, addMovieList, removeMovie } = likedSlice.actions;
export default likedSlice.reducer;
