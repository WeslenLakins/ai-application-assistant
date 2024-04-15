const asyncHandler = require("express-async-handler");
const ScratchResume = require("../models/scratchResumeModel");
const User = require("../models/userModel");
const OpenAI = require("openai");

const openai = new OpenAI(process.env.OPENAI_API_KEY);

// Function to clean skills arrays and ensure they match the enum values
const mapSkillsToEnumValues = (skillsArray) => {
	const enumValues = [
		"Communication",
		"Teamwork",
		"Problem-solving",
		"Leadership",
		"Work ethic",
		"Adaptability",
		"Project management",
		"Analytical skills",
		"Technical proficiency",
		"Creativity",
		"Interpersonal skills",
		"Time management",
		"Critical thinking",
		"Customer service",
		"Attention to detail",
		"Organizational skills",
		"Flexibility",
		"Emotional intelligence",
		"Multitasking",
		"Negotiation",
		"Digital literacy",
		"Financial literacy",
		"Entrepreneurial skills",
		"Marketing",
		"Sales",
		"Language skills",
		"Coding",
		"Social media management",
		"SEO/SEM",
		"Data analysis",
		"Graphic design",
		"Networking",
		"Public speaking",
		"Writing and editing",
		"Research",
		"Teaching and training",
		"Cybersecurity",
		"Environmental awareness",
		"Legal compliance",
		"Risk management",
		"Strategic planning",
		"User experience (UX)",
		"Supply chain management",
		"Quality control",
		"Health and safety",
		"Machine learning/AI",
		"Blockchain",
		"Cloud computing",
		"Agile methodologies",
		"Sustainability",
	];

	return skillsArray
		.map((skill) => skill.replace(/^work\d/, "")) // Remove prefixes like "work1", "work2", etc.
		.map((skillName) =>
			enumValues.find(
				(enumValue) =>
					enumValue.replace(/ /g, "-").toLowerCase() ===
					skillName.replace(/ /g, "-").toLowerCase()
			)
		)
		.filter((skill) => skill); // Ensure only valid enum values are included
};

// @desc    Create a new scratch resume
// @route   POST /api/scratch-resumes
// @access  Private

const createScratchResume = asyncHandler(async (req, res) => {
	// Get the user using the id in the token
	const user = await User.findById(req.user._id);

	// If the user is not found, throw an error
	if (!user) {
		res.status(401);
		throw new Error("User not found");
	}

	// Get the form data from the request body
	const {
		jobTitle,
		company,
		location,
		jobDescription,
		firstName,
		lastName,
		email,
		phone,
		linkedInUrl,
		githubUrl,
		address,
		city,
		state,
		zip,
		school1,
		school1Location,
		school1StartDate,
		school1EndDate,
		school1Degree,
		school2,
		school2Location,
		school2StartDate,
		school2EndDate,
		school2Degree,
		school3,
		school3Location,
		school3StartDate,
		school3EndDate,
		school3Degree,
		work1Company,
		work1Location,
		work1StartDate,
		work1EndDate,
		work1Title,
		work1Skills,
		work2Company,
		work2Location,
		work2StartDate,
		work2EndDate,
		work2Title,
		work2Skills,
		work3Company,
		work3Location,
		work3StartDate,
		work3EndDate,
		work3Title,
		work3Skills,
		work4Company,
		work4Location,
		work4StartDate,
		work4EndDate,
		work4Title,
		work4Skills,
		work5Company,
		work5Location,
		work5StartDate,
		work5EndDate,
		work5Title,
		work5Skills,
	} = req.body;

	// Clean the skills arrays
	const cleanedWork1Skills = mapSkillsToEnumValues(work1Skills);
	const cleanedWork2Skills = mapSkillsToEnumValues(work2Skills);
	const cleanedWork3Skills = mapSkillsToEnumValues(work3Skills);
	const cleanedWork4Skills = mapSkillsToEnumValues(work4Skills);
	const cleanedWork5Skills = mapSkillsToEnumValues(work5Skills);

	// Generate the prompt to send to the OpenAI to generate the resume
	const prompt = `You are an expert resume writer with over 20 years of experience. You will be given a Job Title, Company Name, Location, and a Job Description of a job a Job Applicant (the “Applicant”) is applying for along with information about the Applicant such as their Name, Email, Phone Number, Address, Education, and Work Experience. You will write a resume for the Applicant that aligns their past education and experiences with the requirements and qualifications listed in the Job Description of the position they are applying for. Rather than simply outlining the applicant's past experiences, you should quantify their achievements and contributions in a way that makes sense given the previous job titles the Applicant has held with various employers. What I mean by quantify their achievements and contributions is that you should quantify the impact of the work the Applicant likely did at their previous jobs given the title of the position and name of the company by using metrics that would be relevant to the job the Applicant is applying for. For example: 

    Streamlined the handling of numerous technology and software licensing contracts increasing departmental efficiency in processing transactions 30% by leading the implementation of strategic legal frameworks.  
    Reduced legal expenditure cutting costs 20% year-over-year by strategically managing and tracking work delegated outside counsel for cost-effectiveness. 
    Enhanced company compliance securing a 100% success rate in audits by structuring, drafting, and overseeing the implementation of new company policies and procedures.  
    Elevated research quality on data privacy laws for emerging technology contributing to 2 publications in reputable legal sources by drafting comprehensive memorandum referencing legislation such as HIPPA, the California Privacy Rights Act, and the GDPR. 
    Led effective research projects coordinating three teams of 10 graduate-level students each to complete projects within deadlines by spearheading in-depth legal research assignments and delegating tasks according to skill set. 
    Improved judicial decision-making support providing critical insights on over 100 legal filings by offering in-depth legal analyses and recommendations to the Judge. 
    Strengthened litigation management and federal court procedure understanding aiding in the efficient progress of 50+ cases enhancing litigation management skills and learning the nuances of federal court. 
     
    Additionally, please make sure the only thing included in your response is the applicant’s resume you are creating. Do not use the word resume in the actual resume you create. Finally, ensure you adhere to the following resume writing rules when creating the resume:  
    
    1. Incorporate the right keywords and skills: Job descriptions usually have 43 keywords, but most candidates match only 51% of these. Utilize word cloud tools to identify and include relevant keywords naturally. Focus on both hard skills (60% included) and soft skills (only 28% included).  
    2. Optimal Resume Length: 475-600 Words: Resumes within this range double the interviews compared to those outside it. 77% of resumes do not fall within this optimal word count. Avoid keyword stuffing and use word count tools to stay within the range.  
    3. Avoid Buzzwords and Clichés: Over 51% of resumes include unnecessary buzzwords or clichés. These detract from the message and should be replaced with specific, experience-focused content. Removing clichés can significantly improve a resume.  
     
    JOB APPLICANT CONTACT INFORMATION: 
    
    First Name: ${firstName}
    Last Name: ${lastName}
    Email: ${email}
    Phone: ${phone}
    LinkedIn: ${linkedInUrl}
    Github: ${githubUrl}
    Address: ${address}
    City: ${city}
    State: ${state}
    Zip: ${zip}

    JOB APPLICANT EDUCATION:

    school1: ${school1}
	school1Location: ${school1Location}
    school1StartDate: ${school1StartDate}
    school1EndDate: ${school1EndDate}
    school1Degree: ${school1Degree}
    school2: ${school2}
	school2Location: ${school2Location}
    school2StartDate: ${school2StartDate}
    school2EndDate: ${school2EndDate}
    school2Degree: ${school2Degree}
    school3: ${school3}
	school3Location: ${school3Location}
    school3StartDate: ${school3StartDate}
    school3EndDate: ${school3EndDate}
    school3Degree: ${school3Degree}

    JOB APPLICANT WORK EXPERIENCE:

    work1Company: ${work1Company}
	work1Location: ${work1Location}
    work1StartDate: ${work1StartDate}
    work1EndDate: ${work1EndDate}
    work1Title: ${work1Title}
    work1Skills: ${cleanedWork1Skills}
    work2Company: ${work2Company}
	work2Location: ${work2Location}
    work2StartDate: ${work2StartDate}
    work2EndDate: ${work2EndDate}
    work2Title: ${work2Title}
    work2Skills: ${cleanedWork2Skills}
    work3Company: ${work3Company}
	work3Location: ${work3Location}
    work3StartDate: ${work3StartDate}
    work3EndDate: ${work3EndDate}
    work3Title: ${work3Title}
    work3Skills: ${cleanedWork3Skills}
    work4Company: ${work4Company}
	work4Location: ${work4Location}
    work4StartDate: ${work4StartDate}
    work4EndDate: ${work4EndDate}
    work4Title: ${work4Title}
    work4Skills: ${cleanedWork4Skills}
    work5Company: ${work5Company}
	work5Location: ${work5Location}
    work5StartDate: ${work5StartDate}
    work5EndDate: ${work5EndDate}
    work5Title: ${work5Title}
    work5Skills: ${cleanedWork5Skills}

    POSITION JOB APPLICANT IS APPLYING FOR:

    Job Title: ${jobTitle}
    Company: ${company}
    Location: ${location}
    Job Description: ${jobDescription}

    NEW RESUME:`;

	// Generate the newResume using OpenAI.
	let resume;

	try {
		const completion = await openai.chat.completions.create({
			model: "gpt-4",
			messages: [
				{ role: "system", content: "You are a helpful assistant." },
				{ role: "user", content: prompt },
			],
		});
		resume = completion.choices[0].message.content;
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

	// Create a new resume with the user's id, jobTitle, company, location, jobDescription, and resume
	const scratchResume = await ScratchResume.create({
		user: req.user._id,
		jobTitle,
		company,
		location,
		jobDescription,
		firstName,
		lastName,
		email,
		phone,
		linkedInUrl,
		githubUrl,
		address,
		city,
		state,
		zip,
		school1,
		school1Location,
		school1StartDate,
		school1EndDate,
		school1Degree,
		school2,
		school2Location,
		school2StartDate,
		school2EndDate,
		school2Degree,
		school3,
		school3Location,
		school3StartDate,
		school3EndDate,
		school3Degree,
		work1Company,
		work1Location,
		work1StartDate,
		work1EndDate,
		work1Title,
		work1Skills: cleanedWork1Skills, // Updated to use cleaned skills
		work2Company,
		work2Location,
		work2StartDate,
		work2EndDate,
		work2Title,
		work2Skills: cleanedWork2Skills, // Updated
		work3Company,
		work3Location,
		work3StartDate,
		work3EndDate,
		work3Title,
		work3Skills: cleanedWork3Skills, // Updated
		work4Company,
		work4Location,
		work4StartDate,
		work4EndDate,
		work4Title,
		work4Skills: cleanedWork4Skills, // Updated
		work5Company,
		work5Location,
		work5StartDate,
		work5EndDate,
		work5Title,
		work5Skills: cleanedWork5Skills, // Updated
		scratchResume: resume,
	});

	// Return the created scratch resume
	res.status(201).json(scratchResume);
});

// @desc    Get all scratch resumes
// @route   GET /api/scratch-resumes
// @access  Private

const getScratchResumes = asyncHandler(async (req, res) => {
	// Get the user using the id in the token
	const user = await User.findById(req.user._id);

	// If the user is not found, throw an error
	if (!user) {
		res.status(401);
		throw new Error("User not found");
	}

	// Get all scratch resumes for the user
	const scratchResumes = await ScratchResume.find({ user: req.user._id });

	// Return the scratch resumes
	res.status(200).json(scratchResumes);
});

// @desc    Get a scratch resume by id
// @route   GET /api/scratch-resumes/:id
// @access  Private

const getScratchResumeById = asyncHandler(async (req, res) => {
	// Get the user using the id in the token
	const user = await User.findById(req.user._id);

	// If the user is not found, throw an error
	if (!user) {
		res.status(401);
		throw new Error("User not found");
	}

	// Get the scratch resume for the user
	const scratchResume = await ScratchResume.findById(req.params.id);

	// If the scratch resume is not found, throw an error
	if (!scratchResume) {
		res.status(404);
		throw new Error("Scratch resume not found");
	}

	// If the user is not the owner of the scratch resume, throw an error
	if (scratchResume.user.toString() !== req.user._id.toString()) {
		res.status(401);
		throw new Error("You are not authorized to view this scratch resume");
	}

	// Return the scratch resume
	res.status(200).json(scratchResume);
});

module.exports = {
	createScratchResume,
	getScratchResumes,
	getScratchResumeById,
};
