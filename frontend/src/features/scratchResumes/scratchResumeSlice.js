import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import scratchResumeService from "./scratchResumeService";

const initialState = {
	scratchResumes: [],
	scratchResume: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

// Create a new scratch resume
export const createScratchResume = createAsyncThunk(
	"scratchResumes/createScratchResume",
	async (resumeData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await scratchResumeService.createScratchResume(resumeData, token);
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

// Get user scratch resumes
export const getScratchResumes = createAsyncThunk(
	"scratchResumes/getScratchResumes",
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await scratchResumeService.getScratchResumes(token);
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

// Get user scratch resume by ID
export const getScratchResumeById = createAsyncThunk(
	"scratchResumes/getScratchResumeById",
	async (id, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await scratchResumeService.getScratchResumeById(id, token);
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

export const scratchResumeSlice = createSlice({
	name: "scratchResume",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(createScratchResume.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createScratchResume.fulfilled, (state) => {
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(createScratchResume.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getScratchResumes.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getScratchResumes.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.scratchResumes = action.payload;
			})
			.addCase(getScratchResumes.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getScratchResumeById.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getScratchResumeById.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.scratchResume = action.payload;
			})
			.addCase(getScratchResumeById.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = scratchResumeSlice.actions;
export default scratchResumeSlice.reducer;
