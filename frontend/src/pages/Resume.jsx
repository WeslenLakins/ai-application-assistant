import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { getResumeById, reset } from "../features/resumes/resumeSlice";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Resume() {
	const { id } = useParams();
	const dispatch = useDispatch();

	const { isLoading, isError, isSuccess, resume, message } = useSelector(
		(state) => state.resume
	);

	useEffect(() => {
		if (id) {
			dispatch(getResumeById(id));
		}
	}, [dispatch, id]);

	useEffect(() => {
		return () => {
			if (isSuccess) {
				dispatch(reset());
			}
		};
	}, [isSuccess, dispatch]);

	if (isError) {
		toast.error(message);
	}

	if (isLoading) {
		return <Spinner />;
	}

	const applyPdfStyles = (element) => {
		// Add PDF specific class
		element.classList.add("pdf-content");
		// Apply additional styles or manipulations here if necessary
	};

	const removePdfStyles = (element) => {
		// Remove PDF specific class
		element.classList.remove("pdf-content");
		// Remove additional styles or manipulations here if necessary
	};

	const handleDownloadPdf = async () => {
		const element = document.getElementById("resumeContent");
		const clonedElement = element.cloneNode(true);
		applyPdfStyles(clonedElement);
		document.body.appendChild(clonedElement);

		const pdf = new jsPDF({
			orientation: "portrait",
			unit: "pt",
			format: "letter",
		});

		// We are capturing the entire resume content now, not individual sections
		try {
			const canvas = await html2canvas(clonedElement, {
				scale: 1,
				scrollX: 0,
				scrollY: 0,
				useCORS: true, // This is important if you're loading external resources
			});
			const imgData = canvas.toDataURL("image/png");
			const imgProps = pdf.getImageProperties(imgData);
			let pdfWidth = pdf.internal.pageSize.getWidth();
			let pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

			// Add the first page
			pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

			// Check if the content height exceeds one page, add new pages as necessary
			let remainingHeight = imgProps.height - pdf.internal.pageSize.getHeight();

			while (remainingHeight > 0) {
				pdf.addPage();
				pdf.addImage(
					imgData,
					"PNG",
					0,
					-pdfHeight + remainingHeight,
					pdfWidth,
					pdfHeight
				);
				remainingHeight -= pdf.internal.pageSize.getHeight();
			}
		} catch (error) {
			console.error("Error rendering canvas to PDF:", error);
		}

		pdf.save("resume.pdf");
		removePdfStyles(clonedElement);
		document.body.removeChild(clonedElement);
	};

	const handleCopyToClipboard = () => {
		const text = document.getElementById("resumeContent").innerText;
		navigator.clipboard
			.writeText(text)
			.then(() => toast.success("Resume copied to clipboard!"))
			.catch((err) => toast.error("Failed to copy resume: " + err));
	};

	return (
		<>
			<section className='job-details'>
				<h1>Job Details</h1>
				<p>{new Date(resume.createdAt).toLocaleString("en-US")}</p>
				<p>{resume.jobTitle}</p>
				<p>{resume.company}</p>
				<p>{resume.location}</p>
			</section>
			<hr />
			<section id='resumeContent' className='paper'>
				<div style={{ margin: "10px", lineHeight: "1.6" }}>
					{resume.newResume &&
						resume.newResume.split("\n").map((paragraph, index) => (
							<p key={index} style={{ marginBottom: "20px" }}>
								{paragraph}
							</p>
						))}
				</div>
			</section>
			<div className='actions'>
				<button className='btn' onClick={handleDownloadPdf}>
					Download PDF
				</button>
				<button className='btn' onClick={handleCopyToClipboard}>
					Copy to Clipboard
				</button>
			</div>
		</>
	);
}

export default Resume;
