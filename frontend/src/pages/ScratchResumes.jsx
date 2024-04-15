import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getScratchResumes,
	reset,
} from "../features/scratchResumes/scratchResumeSlice";
import ScratchResumeItem from "../components/ScratchResumeItem";
import Spinner from "../components/Spinner";

function ScratchResumes() {
	const { isLoading, isError, isSuccess, scratchResumes, message } =
		useSelector((state) => state.scratchResume);

	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			if (isSuccess) {
				dispatch(reset());
			}
		};
	}, [isSuccess, dispatch]);

	useEffect(() => {
		dispatch(getScratchResumes());
	}, [dispatch]);

	if (isError) return <div>{message}</div>;

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
					<div>Details</div>
				</div>
				{scratchResumes.map((scratch) => (
					<ScratchResumeItem key={scratch._id} scratch={scratch} />
				))}
			</div>
		</>
	);
}

export default ScratchResumes;
