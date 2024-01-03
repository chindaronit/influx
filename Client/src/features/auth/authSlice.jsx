import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { PORT } from "../../utils/config";

const initialState = {
  user: null,
  token: null,
  loading: false,
  success: false,
};

export const handleSignin = createAsyncThunk(
  "/signin",
  async ({ email, password }, thunkAPI) => {
    try {
      console.log(PORT);
      const res = await axios.post(
        `${PORT}/user/signin/`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    } catch (error) {
      // Check if the error has a response property
      if (error.response) {
        // Handle different HTTP status codes
        switch (error.response.status) {
          case 401:
            return thunkAPI.rejectWithValue("Invalid credentials");
          // Add more cases for other status codes as needed
          // For example, case 404 for user not found, etc.
          default:
            return thunkAPI.rejectWithValue("Something went wrong...");
        }
      } else {
        // Handle non-response errors (e.g., network issues)
        return thunkAPI.rejectWithValue("Server not responding");
      }
    }
  }
);

export const getTokenFromCookie = createAsyncThunk(
  "/getCookie",
  async (value, thunkAPI) => {
    try {
      const cookieValue = await Cookies.get("jwt");
      if (!cookieValue) return null;
      return JSON.parse(cookieValue);
    } catch (error) {
      console.log(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLogout: (state, action) => {
      const res = Cookies.remove("jwt");
      state.user = null;
      state.token = null;
      state.success = false;
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(handleSignin.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(handleSignin.fulfilled, (state, action) => {
        state.user = action.payload?.user;
        state.token = action.payload?.access_token;
        Cookies.set(
          "jwt",
          JSON.stringify({
            user: action.payload?.user,
            token: action.payload?.access_token,
          }),
          {
            expires: 1,
          }
        );
        state.success = true;
        state.loading = false;
      })
      .addCase(handleSignin.rejected, (state, action) => {
        console.log(action); // use of thunkapi is here check payload of the object
        state.loading = false;
        state.success = false;
      })
      .addCase(getTokenFromCookie.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(getTokenFromCookie.fulfilled, (state, action) => {
        if (action.payload?.user) {
          state.user = action.payload.user;
        }
        if (action.payload?.token) {
          state.token = action.payload.token;
        }
        if (!action.payload || !action.payload.user) {
          state.loading = false;
          state.success = false;
        } else if (state.user !== null && state.token !== null) {
          state.success = true;
          state.loading = false;
        }
      })
      .addCase(getTokenFromCookie.rejected, (state, action) => {
        console.log(action); // use of thunkapi is here check payload of the object
        state.loading = false;
        state.success = false;
      });
  },
});

export const { handleLogout } = authSlice.actions;
export default authSlice.reducer;
