import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config"; // Adjust this import according to where your Firebase config is initialized
import { toast } from "react-toastify";

function Headshots() {
	const [workflowRuns, setWorkflowRuns] = useState([]);
	const navigate = useNavigate();
	const auth = getAuth();

	useEffect(() => {
		const fetchWorkflowRuns = async () => {
			try {
				const q = query(
					collection(db, "workflowRuns"),
					where("userId", "==", auth.currentUser.uid)
				);
				const querySnapshot = await getDocs(q);
				const runs = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setWorkflowRuns(runs);
			} catch (error) {
				console.error("Error fetching workflow runs:", error);
				toast.error("Failed to load headshots.");
			}
		};

		if (auth.currentUser) {
			fetchWorkflowRuns();
		} else {
			navigate("/signin");
		}
	}, [auth.currentUser, navigate]);

	const handleRunClick = async (workflowRunId) => {
		navigate(`/headshot/${workflowRunId}`);
	};

	return (
		<div className='headshots-container'>
			<h1>My Headshots</h1>
			<ul className='headshots-list'>
				{workflowRuns.map((run) => (
					<li key={run.id} onClick={() => handleRunClick(run.workflowRunId)}>
						<span>Headshot Created At:</span>{" "}
						{new Date(run.createdAt.toDate()).toLocaleString()} - Click to view
						details
					</li>
				))}
			</ul>
		</div>
	);
}

export default Headshots;
