import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import subscriptionService from "./subscriptionService";

const initialState = {
  products: [],
  url: "",
  subscription: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getSubscriptionProducts = createAsyncThunk(
  "subscription/product",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await subscriptionService.getSubscriptionProduct(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createSubscription = createAsyncThunk(
  "subscription",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await subscriptionService.createCheckoutSession(data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSubscriptions = createAsyncThunk(
  "subscription/get",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await subscriptionService.getSubscription(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const cancelSubscription = createAsyncThunk(
  "subscription/cancel",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await subscriptionService.cancelSubscription(data, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const subscriptionSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder

      .addCase(getSubscriptionProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSubscriptionProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getSubscriptionProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createSubscription.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSubscription.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.url = action.payload;
      })
      .addCase(createSubscription.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSubscriptions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSubscriptions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.subscription = action.payload;
      })
      .addCase(getSubscriptions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(cancelSubscription.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cancelSubscription.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.subscription = {
          ...state.subscription,
          cancel_at_period_end: true,
        };
      })
      .addCase(cancelSubscription.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
