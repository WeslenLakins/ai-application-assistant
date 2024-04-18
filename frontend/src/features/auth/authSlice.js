import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Get user from local storage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
	user: user ? user : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

// Register new user
export const register = createAsyncThunk(
	"auth/register",
	async (user, thunkAPI) => {
		try {
			return await authService.register(user);
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

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
	try {
		return await authService.login(user);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();

		return thunkAPI.rejectWithValue(message);
	}
});

// Logout user
export const logout = createAsyncThunk("auth/logout", async () => {
	await authService.logout();
});

// Async thunk for fetching user profile data from the API endpoint /api/user/:userId
export const getUserProfile = createAsyncThunk(
	"auth/getUserProfile",
	async (userId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token; // Get the token from the state
			return await authService.getUserProfile(userId, token); // Pass userId to the service function
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

// Async thunk for updating user profile data using the API endpoint /api/user/:userId.
export const updateUserProfile = createAsyncThunk(
	"auth/updateUserProfile",
	async ({ userData }, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			const updatedUser = await authService.updateUserProfile(userData, token);

			return updatedUser;
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			// Send status code, to ensure user logs out if Unauthorized
			// But stays login if other API error
			return thunkAPI.rejectWithValue({
				message,
				status: error.response.status,
			});
		}
	}
);

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		signInSuccess: (state, action) => {
			state.user = action.payload.user;
			state.isSuccess = true;
			state.isLoading = false;
			state.isError = false;
			state.message = "";
		},
		reset: (state) => {
			state.isError = false;
			state.isSuccess = false;
			state.isLoading = false;
			state.message = "";
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
			})
			.addCase(getUserProfile.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUserProfile.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = { ...state.user, ...action.payload };
			})
			.addCase(getUserProfile.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			.addCase(updateUserProfile.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateUserProfile.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = {
					...action.payload,
					// Due to new changes, token is not returned anymore.
					token: state.user.token,
				};
			})
			.addCase(updateUserProfile.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload.message;
				// User logs out if Unauthorized
				if (action.payload.status === 401) {
					state.user = null;
				}
			});
	},
});

export const { reset, signInSuccess } = authSlice.actions;
export default authSlice.reducer;
