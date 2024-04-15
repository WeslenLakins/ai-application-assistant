import React from "react";
import { Link } from "react-router-dom";

const ScratchResumeItem = ({ scratch }) => {
	return (
		<div className='ticket'>
			<div>{new Date(scratch.createdAt).toLocaleString("en-US")}</div>
			<div>{scratch.jobTitle}</div>
			<div>{scratch.company}</div>
			<Link to={`/scratch-resume/${scratch._id}`} className='btn'>
				Details
			</Link>
		</div>
	);
};

export default ScratchResumeItem;
