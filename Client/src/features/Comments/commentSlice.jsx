import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { PORT } from "../../utils/config";

const url = `${PORT}/comment/api`;
const initialState = {
  comments: [],
  loading: true,
};

export const getComments = createAsyncThunk(
  "/getComments",
  async ({ media_type, id, token, season, episode }, thunkAPI) => {
    try {
      const res = await axios.get(url, {
        params: {
          media_type: media_type,
          id: id,
          episode: episode,
          season: season,
        },
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("something went wrong...");
    }
  }
);

export const addComment = createAsyncThunk(
  "/addComment",
  async (
    { user, media_type, id, comment, token, season, episode },
    thunkAPI
  ) => {
    try {
      const res = await axios.post(
        url,
        {
          user_name: user.name,
          email: user.email,
          media_type,
          id,
          comment,
          season,
          episode,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("something went wrong...");
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(getComments.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.loading = false;
      })
      .addCase(addComment.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default commentSlice.reducer;
