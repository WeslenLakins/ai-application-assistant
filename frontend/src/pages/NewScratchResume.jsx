import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
	createScratchResume,
	reset,
} from "../features/scratchResumes/scratchResumeSlice";
import Spinner from "../components/Spinner";

function NewScratchResume() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user } = useSelector((state) => state.auth);
	const { isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.scratchResume
	);

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");

	const [jobTitle, setJobTitle] = useState("");
	const [company, setCompany] = useState("");
	const [location, setLocation] = useState("");
	const [jobDescription, setJobDescription] = useState("");

	const [phone, setPhone] = useState("");
	const [linkedInUrl, setLinkedInUrl] = useState("");
	const [githubUrl, setGithubUrl] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [zip, setZip] = useState("");

	const [school1, setSchool1] = useState("");
	const [school1Location, setSchool1Location] = useState("");
	const [school1StartDate, setSchool1StartDate] = useState("");
	const [school1EndDate, setSchool1EndDate] = useState("");
	const [school1Degree, setSchool1Degree] = useState("");

	const [school2, setSchool2] = useState("");
	const [school2Location, setSchool2Location] = useState("");
	const [school2StartDate, setSchool2StartDate] = useState("");
	const [school2EndDate, setSchool2EndDate] = useState("");
	const [school2Degree, setSchool2Degree] = useState("");

	const [school3, setSchool3] = useState("");
	const [school3Location, setSchool3Location] = useState("");
	const [school3StartDate, setSchool3StartDate] = useState("");
	const [school3EndDate, setSchool3EndDate] = useState("");
	const [school3Degree, setSchool3Degree] = useState("");

	const [work1Company, setWork1Company] = useState("");
	const [work1Location, setWork1Location] = useState("");
	const [work1StartDate, setWork1StartDate] = useState("");
	const [work1EndDate, setWork1EndDate] = useState("");
	const [work1Title, setWork1Title] = useState("");

	const [work2Company, setWork2Company] = useState("");
	const [work2Location, setWork2Location] = useState("");
	const [work2StartDate, setWork2StartDate] = useState("");
	const [work2EndDate, setWork2EndDate] = useState("");
	const [work2Title, setWork2Title] = useState("");

	const [work3Company, setWork3Company] = useState("");
	const [work3Location, setWork3Location] = useState("");
	const [work3StartDate, setWork3StartDate] = useState("");
	const [work3EndDate, setWork3EndDate] = useState("");
	const [work3Title, setWork3Title] = useState("");

	const [work4Company, setWork4Company] = useState("");
	const [work4Location, setWork4Location] = useState("");
	const [work4StartDate, setWork4StartDate] = useState("");
	const [work4EndDate, setWork4EndDate] = useState("");
	const [work4Title, setWork4Title] = useState("");

	const [work5Company, setWork5Company] = useState("");
	const [work5Location, setWork5Location] = useState("");
	const [work5StartDate, setWork5StartDate] = useState("");
	const [work5EndDate, setWork5EndDate] = useState("");
	const [work5Title, setWork5Title] = useState("");

	const [checkedItems, setCheckedItems] = useState({});

	const [showSchool2, setShowSchool2] = useState(false);
	const [showSchool3, setShowSchool3] = useState(false);
	const [showWork2, setShowWork2] = useState(false);
	const [showWork3, setShowWork3] = useState(false);
	const [showWork4, setShowWork4] = useState(false);
	const [showWork5, setShowWork5] = useState(false);

	const options = [
		{ id: "option1", value: "Communication", label: "Communication" },
		{ id: "option2", value: "Teamwork", label: "Teamwork" },
		{ id: "option3", value: "Problem Solving", label: "Problem Solving" },
		{ id: "option4", value: "Leadership", label: "Leadership" },
		{ id: "option5", value: "Work Ethic", label: "Work Ethic" },
		{ id: "option6", value: "Adaptability", label: "Adaptability" },
		{ id: "option7", value: "Project Management", label: "Project Management" },
		{ id: "option8", value: "Time Management", label: "Time Management" },
		{ id: "option9", value: "Critical Thinking", label: "Critical Thinking" },
		{ id: "option10", value: "Creativity", label: "Creativity" },
		{ id: "option11", value: "Analytical Skills", label: "Analytical Skills" },
		{
			id: "option12",
			value: "Technical Proficiency",
			label: "Technical Proficiency",
		},
		{
			id: "option13",
			value: "Interpersonal Skills",
			label: "Interpersonal Skills",
		},
		{ id: "option14", value: "Customer Service", label: "Customer Service" },
		{
			id: "option15",
			value: "Attention to Detail",
			label: "Attention to Detail",
		},
		{
			id: "option16",
			value: "Organizational Skills",
			label: "Organizational Skills",
		},
		{ id: "option17", value: "Flexibility", label: "Flexibility" },
		{
			id: "option18",
			value: "Emotional Intelligence",
			label: "Emotional Intelligence",
		},
		{ id: "option19", value: "Multitasking", label: "Multitasking" },
		{ id: "option20", value: "Negotiation", label: "Negotiation" },
		{ id: "option21", value: "Digital Literacy", label: "Digital Literacy" },
		{
			id: "option22",
			value: "Financial Literacy",
			label: "Financial Literacy",
		},
		{
			id: "option23",
			value: "Entrepreneurial Skills",
			label: "Entrepreneurial Skills",
		},
		{ id: "option24", value: "Marketing", label: "Marketing" },
		{ id: "option25", value: "Sales", label: "Sales" },
		{ id: "option26", value: "Language Skills", label: "Language Skills" },
		{ id: "option27", value: "Coding", label: "Coding" },
		{
			id: "option28",
			value: "Social Media Management",
			label: "Social Media Management",
		},
		{ id: "option29", value: "SEO/SEM", label: "SEO/SEM" },
		{ id: "option30", value: "Data Analysis", label: "Data Analysis" },
		{ id: "option31", value: "Graphic Design", label: "Graphic Design" },
		{ id: "option32", value: "Networking", label: "Networking" },
		{ id: "option33", value: "Public Speaking", label: "Public Speaking" },
		{
			id: "option34",
			value: "Writing and Editing",
			label: "Writing and Editing",
		},
		{ id: "option35", value: "Research", label: "Research" },
		{
			id: "option36",
			value: "Teaching and Training",
			label: "Teaching and Training",
		},
		{ id: "option37", value: "Cybersecurity", label: "Cybersecurity" },
		{
			id: "option38",
			value: "Environmental Awareness",
			label: "Environmental Awareness",
		},
		{ id: "option39", value: "Legal Compliance", label: "Legal Compliance" },
		{ id: "option40", value: "Risk Management", label: "Risk Management" },
		{
			id: "option41",
			value: "Strategic Planning",
			label: "Strategic Planning",
		},
		{
			id: "option42",
			value: "User Experience (UX)",
			label: "User Experience (UX)",
		},
		{
			id: "option43",
			value: "Supply Chain Management",
			label: "Supply Chain Management",
		},
		{ id: "option44", value: "Quality Control", label: "Quality Control" },
		{ id: "option45", value: "Health and Safety", label: "Health and Safety" },
		{
			id: "option46",
			value: "Machine Learning/AI",
			label: "Machine Learning/AI",
		},
		{ id: "option47", value: "Blockchain", label: "Blockchain" },
		{ id: "option48", value: "Cloud Computing", label: "Cloud Computing" },
		{
			id: "option49",
			value: "Agile Methodologies",
			label: "Agile Methodologies",
		},
		{ id: "option50", value: "Sustainability", label: "Sustainability" },
	];

	useEffect(() => {
		if (isError) {
			toast.error(message);
			dispatch(reset());
		}

		if (isSuccess) {
			toast.success("New scratch resume created successfully!");
			dispatch(reset());
			navigate("/scratch-resumes");
		}
	}, [isError, isSuccess, dispatch, message, navigate]);

	const handleCheck = (e) => {
		setCheckedItems({
			...checkedItems,
			[e.target.name]: e.target.checked,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const work1SkillsArray = [];
		const work2SkillsArray = [];
		const work3SkillsArray = [];
		const work4SkillsArray = [];
		const work5SkillsArray = [];

		for (const [key, value] of Object.entries(checkedItems)) {
			if (value) {
				if (key.includes("work1")) {
					work1SkillsArray.push(key);
				} else if (key.includes("work2")) {
					work2SkillsArray.push(key);
				} else if (key.includes("work3")) {
					work3SkillsArray.push(key);
				} else if (key.includes("work4")) {
					work4SkillsArray.push(key);
				} else if (key.includes("work5")) {
					work5SkillsArray.push(key);
				}
			}
		}

		const resumeData = {
			firstName,
			lastName,
			email,
			jobTitle,
			company,
			location,
			jobDescription,
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
			work1Skills: work1SkillsArray,
			work2Company,
			work2Location,
			work2StartDate,
			work2EndDate,
			work2Title,
			work2Skills: work2SkillsArray,
			work3Company,
			work3Location,
			work3StartDate,
			work3EndDate,
			work3Title,
			work3Skills: work3SkillsArray,
			work4Company,
			work4Location,
			work4StartDate,
			work4EndDate,
			work4Title,
			work4Skills: work4SkillsArray,
			work5Company,
			work5Location,
			work5StartDate,
			work5EndDate,
			work5Title,
			work5Skills: work5SkillsArray,
		};

		dispatch(createScratchResume(resumeData, user.token));
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<section className='heading'>
				<h1>New Scratch Resume</h1>
				<p>Please fill out the form below</p>
			</section>

			<section className='scratch-resume-form-container'>
				<form onSubmit={handleSubmit}>
					<h2 className='scratch-resume-form-heading'>Job Information</h2>
					<div className='scratch-resume-form-group'>
						<label className='scratch-resume-label' htmlFor='jobTitle'>
							Job Title
						</label>
						<input
							type='text'
							id='jobTitle'
							value={jobTitle}
							onChange={(e) => setJobTitle(e.target.value)}
							required
						/>
						<label className='scratch-resume-label' htmlFor='company'>
							Company
						</label>
						<input
							type='text'
							id='company'
							value={company}
							onChange={(e) => setCompany(e.target.value)}
							required
						/>

						<label className='scratch-resume-label' htmlFor='location'>
							Location
						</label>
						<input
							type='text'
							id='location'
							value={location}
							onChange={(e) => setLocation(e.target.value)}
							required
						/>

						<label className='scratch-resume-label' htmlFor='jobDescription'>
							Job Description
						</label>
						<textarea
							className='scratch-resume-textarea'
							id='jobDescription'
							value={jobDescription}
							onChange={(e) => setJobDescription(e.target.value)}
							required
						/>
					</div>
					<h2 className='scratch-resume-form-heading'>Personal Information</h2>
					<div className='scratch-resume-form-group'>
						<label className='scratch-resume-label' htmlFor='firstName'>
							First Name
						</label>
						<input
							type='text'
							id='firstName'
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							required
						/>

						<label className='scratch-resume-label' htmlFor='lastName'>
							Last Name
						</label>
						<input
							type='text'
							id='lastName'
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							required
						/>

						<label className='scratch-resume-label' htmlFor='email'>
							Email
						</label>
						<input
							type='email'
							id='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>

						<label className='scratch-resume-label' htmlFor='phone'>
							Phone
						</label>
						<input
							type='text'
							id='phone'
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							required
						/>

						<label className='scratch-resume-label' htmlFor='linkedInUrl'>
							LinkedIn URL
						</label>
						<input
							type='text'
							id='linkedInUrl'
							value={linkedInUrl}
							onChange={(e) => setLinkedInUrl(e.target.value)}
							required
						/>

						<label className='scratch-resume-label' htmlFor='githubUrl'>
							GitHub URL
						</label>
						<input
							type='text'
							id='githubUrl'
							value={githubUrl}
							onChange={(e) => setGithubUrl(e.target.value)}
							required
						/>

						<label className='scratch-resume-label' htmlFor='address'>
							Address
						</label>
						<input
							type='text'
							id='address'
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							required
						/>

						<label className='scratch-resume-label' htmlFor='city'>
							City
						</label>
						<input
							type='text'
							id='city'
							value={city}
							onChange={(e) => setCity(e.target.value)}
							required
						/>

						<label className='scratch-resume-label' htmlFor='state'>
							State
						</label>
						<input
							type='text'
							id='state'
							value={state}
							onChange={(e) => setState(e.target.value)}
							required
						/>

						<label className='scratch-resume-label' htmlFor='zip'>
							Zip
						</label>
						<input
							type='text'
							id='zip'
							value={zip}
							onChange={(e) => setZip(e.target.value)}
							required
						/>
					</div>

					<h2 className='scratch-resume-form-heading'>Education</h2>

					<div className='scratch-resume-form-group'>
						<label className='scratch-resume-label' htmlFor='school1'>
							School 1
						</label>
						<input
							type='text'
							id='school1'
							value={school1}
							onChange={(e) => setSchool1(e.target.value)}
							required
						/>

						<label className='scratch-resume-label' htmlFor='school1Location'>
							Location
						</label>
						<input
							type='text'
							id='school1Location'
							value={school1Location}
							onChange={(e) => setSchool1Location(e.target.value)}
							required
						/>

						<label className='scratch-resume-label' htmlFor='school1StartDate'>
							Start Date
						</label>
						<input
							type='date'
							id='school1StartDate'
							value={school1StartDate}
							onChange={(e) => setSchool1StartDate(e.target.value)}
							required
						/>

						<label className='scratch-resume-label' htmlFor='school1EndDate'>
							End Date
						</label>
						<input
							type='date'
							id='school1EndDate'
							value={school1EndDate}
							onChange={(e) => setSchool1EndDate(e.target.value)}
							required
						/>

						<label className='scratch-resume-label' htmlFor='school1Degree'>
							Degree
						</label>
						<input
							type='text'
							id='school1Degree'
							value={school1Degree}
							onChange={(e) => setSchool1Degree(e.target.value)}
							required
						/>
					</div>

					<button
						type='button'
						className='scratch-resume-button'
						onClick={() => setShowSchool2(true)}>
						Add Another School
					</button>

					{showSchool2 && (
						<>
							<div
								className={`scratch-resume-form-group ${
									showSchool2
										? "scratch-resume-visible"
										: "scratch-resume-hidden"
								}`}>
								<label className='scratch-resume-label' htmlFor='school2'>
									School 2
								</label>
								<input
									type='text'
									id='school2'
									value={school2}
									onChange={(e) => setSchool2(e.target.value)}
								/>

								<label
									className='scratch-resume-label'
									htmlFor='school2Location'>
									Location
								</label>
								<input
									type='text'
									id='school2Location'
									value={school2Location}
									onChange={(e) => setSchool2Location(e.target.value)}
								/>

								<label
									className='scratch-resume-label'
									htmlFor='school2StartDate'>
									Start Date
								</label>
								<input
									type='date'
									id='school2StartDate'
									value={school2StartDate}
									onChange={(e) => setSchool2StartDate(e.target.value)}
								/>

								<label
									className='scratch-resume-label'
									htmlFor='school2EndDate'>
									End Date
								</label>
								<input
									type='date'
									id='school2EndDate'
									value={school2EndDate}
									onChange={(e) => setSchool2EndDate(e.target.value)}
								/>

								<label className='scratch-resume-label' htmlFor='school2Degree'>
									Degree
								</label>
								<input
									type='text'
									id='school2Degree'
									value={school2Degree}
									onChange={(e) => setSchool2Degree(e.target.value)}
								/>
							</div>
							<button
								className='scratch-resume-button'
								type='button'
								onClick={() => setShowSchool3(true)}>
								Add Another School
							</button>

							{showSchool3 && (
								<>
									<div
										className={`scratch-resume-form-group ${
											showSchool3
												? "scratch-resume-visible"
												: "scratch-resume-hidden"
										}`}>
										<label className='scratch-resume-label' htmlFor='school3'>
											School 3
										</label>
										<input
											type='text'
											id='school3'
											value={school3}
											onChange={(e) => setSchool3(e.target.value)}
										/>

										<label
											className='scratch-resume-label'
											htmlFor='school3Location'>
											Location
										</label>
										<input
											type='text'
											id='school3Location'
											value={school3Location}
											onChange={(e) => setSchool3Location(e.target.value)}
										/>

										<label
											className='scratch-resume-label'
											htmlFor='school3StartDate'>
											Start Date
										</label>
										<input
											type='date'
											id='school3StartDate'
											value={school3StartDate}
											onChange={(e) => setSchool3StartDate(e.target.value)}
										/>

										<label
											className='scratch-resume-label'
											htmlFor='school3EndDate'>
											End Date
										</label>
										<input
											type='date'
											id='school3EndDate'
											value={school3EndDate}
											onChange={(e) => setSchool3EndDate(e.target.value)}
										/>

										<label
											className='scratch-resume-label'
											htmlFor='school3Degree'>
											Degree
										</label>
										<input
											type='text'
											id='school3Degree'
											value={school3Degree}
											onChange={(e) => setSchool3Degree(e.target.value)}
										/>
									</div>
								</>
							)}
						</>
					)}

					<h2 className='scratch-resume-form-heading'>Work Experience</h2>

					<div className='scratch-resume-form-group'>
						<label className='scratch-resume-label' htmlFor='work1Company'>
							Company
						</label>
						<input
							type='text'
							id='work1Company'
							value={work1Company}
							onChange={(e) => setWork1Company(e.target.value)}
							required
						/>

						<label className='scratch-resume-label' htmlFor='work1Location'>
							Location
						</label>
						<input
							type='text'
							id='work1Location'
							value={work1Location}
							onChange={(e) => setWork1Location(e.target.value)}
							required
						/>

						<label className='scratch-resume-label' htmlFor='work1StartDate'>
							Start Date
						</label>
						<input
							type='date'
							id='work1StartDate'
							value={work1StartDate}
							onChange={(e) => setWork1StartDate(e.target.value)}
							required
						/>
						<label className='scratch-resume-label' htmlFor='work1EndDate'>
							End Date
						</label>
						<input
							type='date'
							id='work1EndDate'
							value={work1EndDate}
							onChange={(e) => setWork1EndDate(e.target.value)}
							required
						/>

						<label className='scratch-resume-label' htmlFor='work1Title'>
							Title
						</label>
						<input
							type='text'
							id='work1Title'
							value={work1Title}
							onChange={(e) => setWork1Title(e.target.value)}
							required
						/>

						<label className='scratch-resume-label' htmlFor='work1Skills'>
							Skills
						</label>
						<div className='scratch-resume-checkbox-group'>
							{options.map((option) => (
								<div key={option.id}>
									<label className='scratch-resume-checkbox-label'>
										<div className='scratch-resume-checkbox-group'>
											<input
												type='checkbox'
												name={`work1${option.value}`}
												checked={checkedItems[`work1${option.value}`] || false}
												onChange={handleCheck}
											/>
											{option.label}
										</div>
									</label>
								</div>
							))}
						</div>
					</div>

					<button
						type='button'
						className='scratch-resume-button'
						onClick={() => setShowWork2(true)}>
						Add Another Job
					</button>

					{showWork2 && (
						<>
							<div
								className={`scratch-resume-form-group ${
									showWork2 ? "scratch-resume-visible" : "scratch-resume-hidden"
								}`}>
								<label className='scratch-resume-label' htmlFor='work2Company'>
									Company
								</label>
								<input
									type='text'
									id='work2Company'
									value={work2Company}
									onChange={(e) => setWork2Company(e.target.value)}
								/>

								<label className='scratch-resume-label' htmlFor='work2Location'>
									Location
								</label>
								<input
									type='text'
									id='work2Location'
									value={work2Location}
									onChange={(e) => setWork2Location(e.target.value)}
								/>

								<label
									className='scratch-resume-label'
									htmlFor='work2StartDate'>
									Start Date
								</label>
								<input
									type='date'
									id='work2StartDate'
									value={work2StartDate}
									onChange={(e) => setWork2StartDate(e.target.value)}
								/>

								<label className='scratch-resume-label' htmlFor='work2EndDate'>
									End Date
								</label>
								<input
									type='date'
									id='work2EndDate'
									value={work2EndDate}
									onChange={(e) => setWork2EndDate(e.target.value)}
								/>

								<label className='scratch-resume-label' htmlFor='work2Title'>
									Title
								</label>
								<input
									type='text'
									id='work2Title'
									value={work2Title}
									onChange={(e) => setWork2Title(e.target.value)}
								/>

								<label className='scratch-resume-label' htmlFor='work2Skills'>
									Skills
								</label>
								<div className='scratch-resume-checkbox-group'>
									{options.map((option) => (
										<div key={option.id}>
											<label className='scratch-resume-checkbox-label'>
												<div className='scratch-resume-checkbox-group'>
													<input
														type='checkbox'
														name={`work2${option.value}`}
														checked={
															checkedItems[`work2${option.value}`] || false
														}
														onChange={handleCheck}
													/>
													{option.label}
												</div>
											</label>
										</div>
									))}
								</div>
							</div>
							<button
								type='button'
								className='scratch-resume-button'
								onClick={() => setShowWork3(true)}>
								Add Another Job
							</button>
						</>
					)}

					{showWork3 && (
						<>
							<div
								className={`scratch-resume-form-group ${
									showWork3 ? "scratch-resume-visible" : "scratch-resume-hidden"
								}`}>
								<label className='scratch-resume-label' htmlFor='work3Company'>
									Company
								</label>
								<input
									type='text'
									id='work3Company'
									value={work3Company}
									onChange={(e) => setWork3Company(e.target.value)}
								/>

								<label className='scratch-resume-label' htmlFor='work3Location'>
									Location
								</label>
								<input
									type='text'
									id='work3Location'
									value={work3Location}
									onChange={(e) => setWork3Location(e.target.value)}
								/>

								<label
									className='scratch-resume-label'
									htmlFor='work3StartDate'>
									Start Date
								</label>
								<input
									type='date'
									id='work3StartDate'
									value={work3StartDate}
									onChange={(e) => setWork3StartDate(e.target.value)}
								/>

								<label className='scratch-resume-label' htmlFor='work3EndDate'>
									End Date
								</label>
								<input
									type='date'
									id='work3EndDate'
									value={work3EndDate}
									onChange={(e) => setWork3EndDate(e.target.value)}
								/>

								<label className='scratch-resume-label' htmlFor='work3Title'>
									Title
								</label>
								<input
									type='text'
									id='work3Title'
									value={work3Title}
									onChange={(e) => setWork3Title(e.target.value)}
								/>

								<label className='scratch-resume-label' htmlFor='work3Skills'>
									Skills
								</label>
								<div className='scratch-resume-checkbox-group'>
									{options.map((option) => (
										<div key={option.id}>
											<label className='scratch-resume-checkbox-label'>
												<div className='scratch-resume-checkbox-group'>
													<input
														type='checkbox'
														name={`work3${option.value}`}
														checked={
															checkedItems[`work3${option.value}`] || false
														}
														onChange={handleCheck}
													/>
													{option.label}
												</div>
											</label>
										</div>
									))}
								</div>
							</div>
							<button
								type='button'
								className='scratch-resume-button'
								onClick={() => setShowWork4(true)}>
								Add Another Job
							</button>
						</>
					)}

					{showWork4 && (
						<>
							<div
								className={`scratch-resume-form-group ${
									showWork4 ? "scratch-resume-visible" : "scratch-resume-hidden"
								}`}>
								<label className='scratch-resume-label' htmlFor='work4Company'>
									Company
								</label>
								<input
									type='text'
									id='work4Company'
									value={work4Company}
									onChange={(e) => setWork4Company(e.target.value)}
								/>

								<label className='scratch-resume-label' htmlFor='work4Location'>
									Location
								</label>
								<input
									type='text'
									id='work4Location'
									value={work4Location}
									onChange={(e) => setWork4Location(e.target.value)}
								/>

								<label
									className='scratch-resume-label'
									htmlFor='work4StartDate'>
									Start Date
								</label>
								<input
									type='date'
									id='work4StartDate'
									value={work4StartDate}
									onChange={(e) => setWork4StartDate(e.target.value)}
								/>

								<label className='scratch-resume-label' htmlFor='work4EndDate'>
									End Date
								</label>
								<input
									type='date'
									id='work4EndDate'
									value={work4EndDate}
									onChange={(e) => setWork4EndDate(e.target.value)}
								/>

								<label className='scratch-resume-label' htmlFor='work4Title'>
									Title
								</label>
								<input
									type='text'
									id='work4Title'
									value={work4Title}
									onChange={(e) => setWork4Title(e.target.value)}
								/>

								<label className='scratch-resume-label' htmlFor='work4Skills'>
									Skills
								</label>
								<div className='scratch-resume-checkbox-group'>
									{options.map((option) => (
										<div key={option.id}>
											<label className='scratch-resume-checkbox-label'>
												<div className='scratch-resume-checkbox-group'>
													<input
														type='checkbox'
														name={`work4${option.value}`}
														checked={
															checkedItems[`work4${option.value}`] || false
														}
														onChange={handleCheck}
													/>
													{option.label}
												</div>
											</label>
										</div>
									))}
								</div>
							</div>
							<button
								type='button'
								className='scratch-resume-button'
								onClick={() => setShowWork5(true)}>
								Add Another Job
							</button>
						</>
					)}

					{showWork5 && (
						<>
							<div
								className={`scratch-resume-form-group ${
									showWork5 ? "scratch-resume-visible" : "scratch-resume-hidden"
								}`}>
								<label className='scratch-resume-label' htmlFor='work5Company'>
									Company
								</label>
								<input
									type='text'
									id='work5Company'
									value={work5Company}
									onChange={(e) => setWork5Company(e.target.value)}
								/>

								<label className='scratch-resume-label' htmlFor='work5Location'>
									Location
								</label>
								<input
									type='text'
									id='work5Location'
									value={work5Location}
									onChange={(e) => setWork5Location(e.target.value)}
								/>

								<label
									className='scratch-resume-label'
									htmlFor='work5StartDate'>
									Start Date
								</label>
								<input
									type='date'
									id='work5StartDate'
									value={work5StartDate}
									onChange={(e) => setWork5StartDate(e.target.value)}
								/>

								<label className='scratch-resume-label' htmlFor='work5EndDate'>
									End Date
								</label>
								<input
									type='date'
									id='work5EndDate'
									value={work5EndDate}
									onChange={(e) => setWork5EndDate(e.target.value)}
								/>

								<label className='scratch-resume-label' htmlFor='work5Title'>
									Title
								</label>
								<input
									type='text'
									id='work5Title'
									value={work5Title}
									onChange={(e) => setWork5Title(e.target.value)}
								/>

								<label className='scratch-resume-label' htmlFor='work5Skills'>
									Skills
								</label>
								<div className='scratch-resume-checkbox-group'>
									{options.map((option) => (
										<div key={option.id}>
											<label className='scratch-resume-checkbox-label'>
												<div className='scratch-resume-checkbox-group'>
													<input
														type='checkbox'
														name={`work5${option.value}`}
														checked={
															checkedItems[`work5${option.value}`] || false
														}
														onChange={handleCheck}
													/>
													{option.label}
												</div>
											</label>
										</div>
									))}
								</div>
							</div>
						</>
					)}
					<div className='scratch-resume-form-group'>
						<button className='btn btn-block'>Generate Scratch Resume</button>
					</div>
				</form>
			</section>
		</>
	);
}

export default NewScratchResume;
