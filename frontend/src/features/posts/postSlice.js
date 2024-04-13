import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

const initialState = {
	posts: [],
	post: {},
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: "",
};

// Create new post
export const createPost = createAsyncThunk(
	"post/createPost",
	async (postData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await postService.createPost(postData, token);
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

// Get all posts
export const getPosts = createAsyncThunk(
	"post/getPosts",
	async (_, thunkAPI) => {
		try {
			return await postService.getPosts();
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

// Get single post by id
export const getPost = createAsyncThunk(
	"post/getPost",
	async (id, thunkAPI) => {
		try {
			return await postService.getPost(id);
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

// Update post by id
export const updatePost = createAsyncThunk(
	"post/updatePost",
	async ({ id, ...postData }, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await postService.updatePost(id, postData, token); // Ensure correct parameter order
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

export const postSlice = createSlice({
	name: "post",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(createPost.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createPost.fulfilled, (state) => {
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(createPost.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
				state.message = action.payload;
			})
			.addCase(getPosts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getPosts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.posts = action.payload;
			})
			.addCase(getPosts.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
				state.message = action.payload;
			})
			.addCase(getPost.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getPost.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.post = action.payload;
			})
			.addCase(getPost.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
				state.message = action.payload;
			})
			.addCase(updatePost.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updatePost.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.post = action.payload;
			})
			.addCase(updatePost.rejected, (state, action) => {
				state.isError = true;
				state.isLoading = false;
				state.message = action.payload;
			});
	},
});

export const { reset } = postSlice.actions;

export default postSlice.reducer;
