import axios from "axios";

const API_URL = "/api/scratch-resumes/";

// Create a new scratch resume
export const createScratchResume = async (resumeData, token) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(API_URL, resumeData, config);
	return response.data;
};

// Get user scratch resumes
const getScratchResumes = async (token) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL, config);
	return response.data;
};

// Get user scratch resume by ID
const getScratchResumeById = async (id, token) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(`${API_URL}${id}`, config);
	return response.data;
};

const scratchResumeService = {
	createScratchResume,
	getScratchResumes,
	getScratchResumeById,
};

export default scratchResumeService;
