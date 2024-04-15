import React from "react";
import { Link } from "react-router-dom";
import { FaFile, FaSync } from "react-icons/fa";

function ScratchResumeDashboard() {
	return (
		<>
			<section className='heading'>
				<h1>Resume from Scratch Dashboard</h1>
				<p>
					Click the buttons below to generate a new resume from scratch or veiw
					the new resumes you've made.
				</p>
			</section>

			<Link to='/new-scratch-resume' className='btn btn-reverse btn-block'>
				<FaSync /> Create a New Resume from Scratch
			</Link>
			<Link to='/scratch-resumes' className='btn btn-block'>
				<FaFile /> View Resumes
			</Link>
		</>
	);
}

export default ScratchResumeDashboard;
