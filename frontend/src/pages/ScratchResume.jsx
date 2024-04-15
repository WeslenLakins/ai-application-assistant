import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getScratchResumeById,
	reset,
} from "../features/scratchResumes/scratchResumeSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

function ScratchResume() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { isLoading, isError, scratchResume, message } = useSelector(
		(state) => state.scratchResume
	);

	useEffect(() => {
		if (id) {
			dispatch(getScratchResumeById(id));
		}

		return () => {
			dispatch(reset());
		};
	}, [id, dispatch]);

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}
	}, [isError, message]);

	const formatResumeText = (resumeText) => {
		if (!resumeText) return null;

		const sections = resumeText.split("\n\n").filter(Boolean);

		return sections.map((section, index) => {
			const [sectionHeader, ...content] = section.split("\n").filter(Boolean);

			// Check if the section header is 'WORK EXPERIENCE' to format it as a list
			const isWorkExperienceSection = sectionHeader === "WORK EXPERIENCE";

			return (
				<div key={index} className='resume-section'>
					<h2>{sectionHeader}</h2>
					{isWorkExperienceSection ? (
						<ul>
							{content.map((item, lineIndex) => (
								<li key={lineIndex} className='resume-list-item'>
									{!item.startsWith("•") ? `• ${item}` : item}
								</li>
							))}
						</ul>
					) : (
						<div>
							{content.map((item, lineIndex) => (
								<p
									key={lineIndex}
									className={
										sectionHeader !== "SKILLS" ? "" : "resume-list-item"
									}>
									{sectionHeader !== "SKILLS" || item.startsWith("•")
										? item
										: `• ${item}`}
								</p>
							))}
						</div>
					)}
				</div>
			);
		});
	};

	if (isLoading) {
		return <Spinner />;
	}

	if (!scratchResume?.scratchResume) {
		return <p>Resume data is not available.</p>;
	}

	const formattedResume = formatResumeText(scratchResume.scratchResume);

	return (
		<div className='resume-container'>
			<div className='resume-page'>{formattedResume}</div>
		</div>
	);
}

export default ScratchResume;
