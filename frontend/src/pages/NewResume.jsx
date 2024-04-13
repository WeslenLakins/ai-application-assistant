import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createResume, reset } from "../features/resumes/resumeSlice";
import Spinner from "../components/Spinner";

const NewResume = () => {
	const user = useSelector((state) => state.auth);
	const { isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.resume
	);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [resume, setResume] = useState("");
	const [company, setCompany] = useState("");
	const [location, setLocation] = useState("");
	const [jobDescription, setJobDescription] = useState("");
	const [jobTitle, setJobTitle] = useState("");

	useEffect(() => {
		if (isError) {
			toast.error(message);
			dispatch(reset());
		}

		if (isSuccess) {
			dispatch(reset());
			navigate("/resumes");
		}
	}, [isError, isSuccess, message, dispatch, navigate]);

	const onSubmit = (e) => {
		e.preventDefault();

		const resumeData = {
			jobTitle,
			company,
			location,
			jobDescription,
			currentResume: resume,
		};

		dispatch(createResume(resumeData, user.user.token));
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<section className='heading'>
				<h1>New Resume</h1>
				<p>Please fill out the form below</p>
			</section>

			<section className='form'>
				<form onSubmit={onSubmit}>
					<div className='form-group'>
						<label htmlFor='jobTitle'>Job Title</label>
						<input
							type='text'
							name='jobTitle'
							id='jobTitle'
							className='form-control'
							placeholder='Job title'
							value={jobTitle}
							onChange={(e) => setJobTitle(e.target.value)}></input>
					</div>
					<div className='form-group'>
						<label htmlFor='company'>Company</label>
						<input
							type='text'
							name='company'
							id='company'
							className='form-control'
							placeholder='Company name or client name'
							value={company}
							onChange={(e) => setCompany(e.target.value)}></input>
					</div>
					<div className='form-group'>
						<label htmlFor='location'>Location</label>
						<input
							type='text'
							name='location'
							id='location'
							className='form-control'
							placeholder='Location'
							value={location}
							onChange={(e) => setLocation(e.target.value)}></input>
					</div>
					<div className='form-group'>
						<label htmlFor='jobDescription'>Job Description</label>
						<textarea
							name='jobDescription'
							id='jobDescription'
							className='form-control'
							placeholder='Copy & paste the job description or project requirements here'
							value={jobDescription}
							onChange={(e) => setJobDescription(e.target.value)}></textarea>
					</div>
					<div className='form-group'>
						<label htmlFor='resume'>Current Resume</label>
						<textarea
							name='resume'
							id='resume'
							className='form-control'
							placeholder='Copy & paste your current resume or add your skills & experience here'
							value={resume}
							onChange={(e) => setResume(e.target.value)}></textarea>
					</div>
					<div className='form-group'>
						<button className='btn btn-block'>Generate Resume</button>
					</div>
				</form>
			</section>
		</>
	);
};

export default NewResume;
