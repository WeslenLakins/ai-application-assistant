/*
The code below is a Redux slice for authentication using Redux Toolkit. It manages the state related to user authentication, including registering, logging in, and logging out users. Here's a breakdown of what the code does:

The createSlice and createAsyncThunk functions are imported from Redux Toolkit, and the authService module is imported.

The user is retrieved from local storage and the initial state for the authentication slice is defined.

The register, login, and logout async thunks are created. These thunks use the authService to make API requests. If an error occurs during the request, the error message is extracted and returned using thunkAPI.rejectWithValue.

The authSlice is created using createSlice. The slice is named 'auth' and it includes the initial state, some reducers, and extra reducers for handling the pending, fulfilled, and rejected states of the async thunks.

The reset reducer is used to reset the state.

In the extraReducers, the state is updated based on the action types of the async thunks. For example, when the register thunk is pending, isLoading is set to true. When it's fulfilled, isLoading is set to false, isSuccess is set to true, and the user data is stored in the state. When it's rejected, isLoading is set to false, isError is set to true, the error message is stored in the state, and the user data is cleared.

The reset action and the reducer function are exported from the module. The reducer function is the default export, so it can be added to the Redux store.
*/

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Get user from local storage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user || null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Register new user
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

// Async thunk for fetching user profile data from the API endpoint /api/user/:userId
export const getUserProfile = createAsyncThunk(
  'auth/getUserProfile',
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token // Get the token from the state
      return await authService.getUserProfile(userId, token) // Pass userId to the service function
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Async thunk for updating user profile data using the API endpoint /api/user/:userId.
export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (user, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      const updatedUser = await authService.updateUserProfile(user, token)

      return updatedUser
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload.user
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
