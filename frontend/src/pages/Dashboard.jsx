import { Link } from "react-router-dom";
import {
	FaLaptop,
	FaListAlt,
	FaSyncAlt,
	FaUsers,
	FaFileAlt,
	FaFile,
} from "react-icons/fa";
import { track } from "@vercel/analytics";

function Dashboard() {
	// Event handler for 'Generate Cover Letter' button click
	const handleGenerateCoverLetterClick = () => {
		track("Generate Cover Letter Clicked"); // Tracking event
	};

	// Event handler for 'Review Cover Letters' button click
	const handleReviewCoverLettersClick = () => {
		track("Review Cover Letters Clicked"); // Tracking event
	};

	return (
		<>
			<section className='heading'>
				<h1>
					<FaLaptop /> AI Application Assistant
				</h1>
				<p>How can we help streamline your application process?</p>
			</section>

			<br />
			<section className='sub-heading'>
				<h2>Cover Letters</h2>
			</section>
			<Link
				to='/new-job'
				className='btn btn-reverse btn-block'
				onClick={handleGenerateCoverLetterClick}>
				<FaSyncAlt /> Generate a New Cover Letter
			</Link>

			<Link
				to='/jobs'
				className='btn btn-block'
				onClick={handleReviewCoverLettersClick}>
				<FaListAlt /> View Cover Letters
			</Link>

			<br />

			<section className='sub-heading'>
				<h2>Resumes</h2>

				<Link
					to='/scratch-resume-dashboard'
					className='btn btn-reverse btn-block'>
					<FaFile /> Create a New Resume from Scratch
				</Link>

				<Link to='/resume-dashboard' className='btn btn-block'>
					<FaFileAlt /> Create a New Resume Using Your Existing Resume
				</Link>
			</section>

			<br />
			<section className='sub-heading'>
				<h2>Networking</h2>

				<Link to='/networking-pro' className='btn btn-block'>
					<FaUsers /> Connect Pro
				</Link>
			</section>

			<br />
			<section className='sub-heading'>
				<h2>Professional Headshots</h2>

				<p>Coming Soon...</p>
			</section>

			<br />
			<br />
			<br />
		</>
	);
}

export default Dashboard;
