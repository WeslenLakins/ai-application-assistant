import { Link } from "react-router-dom";

function ResumeItem({ resume }) {
	return (
		<div className='ticket'>
			<div>{new Date(resume.createdAt).toLocaleString("en-US")}</div>
			<div>{resume.jobTitle}</div>
			<div>{resume.company}</div>
			<Link to={`/resume/${resume._id}`} className='btn btn-reverse btn-sm'>
				View
			</Link>
		</div>
	);
}

export default ResumeItem;
