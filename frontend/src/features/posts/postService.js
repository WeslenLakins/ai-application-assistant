import axios from "axios";

const API_URL = "/api/posts/";

// Create new post
const createPost = async (postData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(API_URL, postData, config);

	return response.data;
};

// Get all posts
const getPosts = async () => {
	const response = await axios.get(API_URL);

	return response.data;
};

// Get single post by id
const getPost = async (id) => {
	const response = await axios.get(`${API_URL}${id}`);

	return response.data;
};

// update post by id
const updatePost = async (id, postData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.put(`${API_URL}${id}`, postData, config);

	return response.data;
};

const postService = {
	createPost,
	getPosts,
	getPost,
	updatePost,
};

export default postService;
