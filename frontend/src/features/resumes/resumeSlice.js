import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import resumeService from "./resumeService";

const initialState = {
	resumes: [],
	resume: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

// Create a new resume
export const createResume = createAsyncThunk(
	"resumes/createResume",
	async (resumeData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await resumeService.createResume(resumeData, token);
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

// Get user resumes
export const getResumes = createAsyncThunk(
	"resumes/getResumes",
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await resumeService.getResumes(token);
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

// Get user resume by ID
export const getResumeById = createAsyncThunk(
	"resumes/getResumeById",
	async (id, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await resumeService.getResumeById(id, token);
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

export const resumeSlice = createSlice({
	name: "resume",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(createResume.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createResume.fulfilled, (state) => {
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(createResume.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getResumes.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getResumes.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.resumes = action.payload;
			})
			.addCase(getResumes.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getResumeById.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getResumeById.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.resume = action.payload;
			})
			.addCase(getResumeById.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = resumeSlice.actions;
export default resumeSlice.reducer;
