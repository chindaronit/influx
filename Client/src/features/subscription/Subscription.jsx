import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5000/subscription/api";

const initialState = {
  plan: null,
  loading: true,
};

export const getPlan = createAsyncThunk(
  "/subscription/getPlan",
  async (email, thunkAPI) => {
    try {
      const res = await axios.get(url, {
        params: { email: email },
      });
      return res.data[0];
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("something went wrong...");
    }
  }
);

export const upgradePlan = createAsyncThunk(
  "/subscription/upgradePlan",
  async ({ email, plan, dateUpgraded }, thunkAPI) => {
    try {
      console.log(email,plan,dateUpgraded);
      const res = await fetch("http://localhost:5000/subscription/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          plan,
          dateUpgraded
        }),
      });
      return { email: email, plan: plan, dateUpgraded: dateUpgraded };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("something went wrong...");
    }
  }
);

const watchlistSlice = createSlice({
  name: "subscription",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.plan = action.payload;
      })
      .addCase(getPlan.rejected, (state, action) => {
        console.log(action); // use of thunkapi is here check payload of the object
        state.loading = false;
      })
      .addCase(upgradePlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(upgradePlan.fulfilled, (state, action) => {
        state.loading = false;
        state.plan = action.payload;
      })
      .addCase(upgradePlan.rejected, (state, action) => {
        console.log(action); // use of thunkapi is here check payload of the object
        state.loading = false;
      });
  },
});

export default watchlistSlice.reducer;
