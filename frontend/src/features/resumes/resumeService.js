import axios from "axios";

const API_URL = "/api/resumes/";

// Create a new resume
const createResume = async (resumeData, token) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(API_URL, resumeData, config);
	return response.data;
};

// Get user resumes
const getResumes = async (token) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL, config);
	return response.data;
};

// Get user resume by ID
const getResumeById = async (id, token) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(`${API_URL}${id}`, config);
	return response.data;
};

const resumeService = {
	createResume,
	getResumes,
	getResumeById,
};

export default resumeService;
