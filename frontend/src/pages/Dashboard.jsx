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
				<FaSyncAlt /> Generate New Cover Letter
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
					<FaFile /> New Resume from Scratch Dashboard
				</Link>

				<Link to='/resume-dashboard' className='btn btn-block'>
					<FaFileAlt />
					New Resume Using Existing Resume Dashboard
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
				<Link to='/new-headshot' className='btn btn-reverse btn-block'>
					<FaSyncAlt /> Generate New Headshot
				</Link>
				<Link to='/headshots' className='btn btn-block'>
					<FaListAlt /> View Headshots
				</Link>
			</section>

			<br />
			<br />
			<br />
		</>
	);
}

export default Dashboard;
