const asyncHandler = require("express-async-handler");
const OpenAI = require("openai");
const Resume = require("../models/resumeModel");
const User = require("../models/userModel");

const openai = new OpenAI(process.env.OPENAI_API_KEY);

// @desc    Create a new resume
// @route   POST /api/resumes
// @access  Private

const createResume = asyncHandler(async (req, res) => {
	const { jobTitle, company, location, jobDescription, currentResume } =
		req.body;

	// Validation
	if (!jobTitle || !company || !location || !jobDescription || !currentResume) {
		res.status(400);
		throw new Error("Please fill in all fields");
	}

	// Get the user using the id in the token
	const user = await User.findById(req.user._id);

	// If the user is not found, throw an error
	if (!user) {
		res.status(404);
		throw new Error("User not found");
	}

	// Generate the prompt for the newResume to send to OpenAI
	const prompt = `Your task is to craft a tailored resume for a Job Applicant (referred to as the “Applicant”) who is applying for a specific position. You will be provided with the Job Title, Company Name, Location, and Job Description of the vacancy, alongside the Applicant's current Resume. Your objective is to revise the Applicant's resume to closely align their education and prior work experiences with the job's requirements and desired qualifications. Achieve this by quantifying the Applicant's accomplishments and contributions in their previous roles, employing the formula: accomplished (X), as measured by (Y), by doing (Z). Maintain the examples provided as a guideline for quantifying achievements:

  • Streamlined the handling of numerous technology and software licensing contracts increasing departmental efficiency in processing transactions 30% by leading the implementation of strategic legal frameworks. 
  • Reduced legal expenditure cutting costs 20% year-over-year by strategically managing and tracking work delegated outside counsel for cost-effectiveness.
  • Enhanced company compliance securing a 100% success rate in audits by structuring, drafting, and overseeing the implementation of new company policies and procedures.
  • Elevated research quality on data privacy laws for emerging technology contributing to 2 publications in reputable legal sources by drafting comprehensive memorandum referencing legislation such as HIPPA, the California Privacy Rights Act, and the GDPR.
  • Led effective research projects coordinating three teams of 10 graduate-level students each to complete projects within deadlines by spearheading in-depth legal research assignments and delegating tasks according to skill set.
  • Improved judicial decision-making support providing critical insights on over 100 legal filings by offering in-depth legal analyses and recommendations to the Judge.
  • Strengthened litigation management and federal court procedure understanding aiding in the efficient progress of 50+ cases enhancing litigation management skills and learning the nuances of federal court.

  Ensure the new resume mirrors the language style and tone found in the job description to establish relevance and appeal. Format the revised resume to reflect the Applicant's current resume format, adopting a modern and professional tone appropriate for a contemporary workplace. The revamped resume must be concise, fitting within a one-page limit, unless the users current resume is longer than one-page, and should exclusively focus on resume content without including extraneous information.

  Provide the necessary details as follows:
  
  Job title: ${jobTitle}
  Company: ${company}
  Location: ${location}
  Job description: ${jobDescription}
  
  Current resume:
  ${currentResume}
  
  New resume:`;

	// Generate the newResume using OpenAI.
	let newResume;
	try {
		const completion = await openai.chat.completions.create({
			model: "gpt-4",
			messages: [
				{ role: "system", content: "You are a helpful assistant." },
				{ role: "user", content: prompt },
			],
		});
		newResume = completion.choices[0].message.content;
	} catch (error) {
		console.error("Error in OpenAI API call:", error);
		if (error.response) {
			// If the error response from OpenAI API includes details, log or use them
			console.error("OpenAI API error response:", error.response.data);
			res.status(500).json({ error: error.response.data });
		} else {
			// For other types of errors (e.g., network issues)
			res.status(500).json({ error: "Error in OpenAI API call" });
		}
		return;
	}

	// Create a new resume with the user's id, jobTitle, company, location, jobDescription, currentResume, and newResume
	const resume = await Resume.create({
		user: req.user._id,
		jobTitle,
		company,
		location,
		jobDescription,
		currentResume,
		newResume,
	});

	// Return the created resume
	res.status(201).json(resume);
});

// @desc    Get all resumes
// @route   GET /api/resumes
// @access  Private

const getResumes = asyncHandler(async (req, res) => {
	// Get the user using the id in the token
	const user = await User.findById(req.user._id);

	// If the user is not found, throw an error
	if (!user) {
		res.status(401);
		throw new Error("User not found");
	}

	// Get all resumes for the user
	const resumes = await Resume.find({ user: req.user._id });

	// Return the resumes
	res.status(200).json(resumes);
});

// @desc    Get a resume by id
// @route   GET /api/resumes/:id
// @access  Private

const getResumeById = asyncHandler(async (req, res) => {
	// Get the user using the id in the token
	const user = await User.findById(req.user._id);

	// If the user is not found, throw an error
	if (!user) {
		res.status(401);
		throw new Error("User not found");
	}

	// Get the resume for the user
	const resume = await Resume.findById(req.params.id);

	// If the resume is not found, throw an error
	if (!resume) {
		res.status(404);
		throw new Error("Resume not found");
	}

	// If the user is not the owner of the resume, throw an error
	if (resume.user.toString() !== req.user._id.toString()) {
		res.status(401);
		throw new Error("You are not authorized to view this resume");
	}

	// Return the resume
	res.status(200).json(resume);
});

module.exports = { createResume, getResumes, getResumeById };
