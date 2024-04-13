import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getResumes, reset } from "../features/resumes/resumeSlice";
import Spinner from "../components/Spinner";
import ResumeItem from "../components/ResumeItem";

function Resumes() {
	const { isLoading, isError, isSuccess, resumes, message } = useSelector(
		(state) => state.resume
	);

	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			if (isSuccess) {
				dispatch(reset());
			}
		};
	}, [isSuccess, dispatch]);

	useEffect(() => {
		dispatch(getResumes());
	}, [dispatch]);

	if (isError) {
		return <div>{message}</div>;
	}

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<h1>Resumes</h1>
			<div className='tickets'>
				<div className='ticket-headings'>
					<div>Date</div>
					<div>Title</div>
					<div>Company</div>
					<div></div>
				</div>
				{resumes.map((resume) => (
					<ResumeItem key={resume._id} resume={resume} />
				))}
			</div>
		</>
	);
}

export default Resumes;
