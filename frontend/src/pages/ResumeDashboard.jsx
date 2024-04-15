import React from "react";
import { Link } from "react-router-dom";
import { FaFile, FaSync } from "react-icons/fa";

function ResumeDashboard() {
	return (
		<>
			<section className='heading'>
				<h1>Revised Resume Dashboard</h1>
				<p>
					Click the buttons below to generate new revised resumes or veiw the
					revised resumes you've made.
				</p>
			</section>

			<Link to='/new-resume' className='btn btn-reverse btn-block'>
				<FaSync /> Create New Resume
			</Link>
			<Link to='/resumes' className='btn btn-block'>
				<FaFile /> View Resumes
			</Link>
		</>
	);
}

export default ResumeDashboard;
