import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

function NewHeadshot() {
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		imageStyle: "",
		subjectType: "",
		imageUrls: [],
	});

	const { imageStyle, subjectType, imageUrls } = formData;

	const auth = getAuth();
	const navigate = useNavigate();
	const isMounted = useRef(false);

	useEffect(() => {
		isMounted.current = true;

		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user && isMounted.current) {
				setFormData((prevState) => ({ ...prevState, userRef: user.uid }));
			} else {
				navigate("/signin");
			}
		});

		return () => {
			isMounted.current = false;
			unsubscribe();
		};
	}, [auth, navigate]);

	const storeImage = async (image) => {
		return new Promise((resolve, reject) => {
			const storage = getStorage();
			const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
			const storageRef = ref(storage, "images/" + fileName);

			const uploadTask = uploadBytesResumable(storageRef, image);

			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log("Upload is " + progress + "% done");
				},
				(error) => {
					reject(error);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						resolve(downloadURL);
					});
				}
			);
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		if (!imageStyle || !subjectType) {
			toast.error("Please fill in all fields");
			setLoading(false);
			return;
		}

		try {
			const imageUrlsArray = await Promise.all(
				imageUrls.map((image) => storeImage(image))
			);

			// Prepare the request body
			const body = {
				workflow_id: "wkf_7vwHTbRuZ8qaNZ",
				input: {
					gender: subjectType.toLowerCase(),
					image_style: imageStyle,
					sample_image_url: imageUrlsArray[0],
					sample_image_url_1: imageUrlsArray[1],
					sample_image_url_2: imageUrlsArray[2],
					sample_image_url_3: imageUrlsArray[3],
				},
			};

			// Send a POST request to your backend
			const response = await fetch("/api/leap-ai", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();

			// After receiving the data, create a new document in Firestore
			const workflowRunDoc = {
				userId: auth.currentUser.uid,
				workflowRunId: data.id,
				gender: data.input.gender,
				imageStyle: data.input.image_style,
				imageUrls: [
					data.input.sample_image_url,
					data.input.sample_image_url_1,
					data.input.sample_image_url_2,
					data.input.sample_image_url_3,
				],
				createdAt: serverTimestamp(),
				status: data.status,
			};

			await addDoc(collection(db, "workflowRuns"), workflowRunDoc);

			toast.success(
				"Your new headshot is being created! Click the 'View Headshots' button on the dashboard to see the finished product. It may take a few minutes."
			);
		} catch (error) {
			console.error("Error:", error);
			toast.error("Failed to upload images or create prompt.");
		} finally {
			setLoading(false);
		}
	};

	const onMutate = (e) => {
		if (e.target.files) {
			setFormData((prevState) => ({
				...prevState,
				imageUrls: Array.from(e.target.files),
			}));
		}
	};

	if (loading) {
		return <Spinner />;
	}

	return (
		<div className='new-headshot-container'>
			<header>
				<p className='pageHeader'>New Headshot</p>
			</header>
			<main>
				<form onSubmit={onSubmit}>
					{/* Subject Type Selection */}
					<div className='form-group'>
						<label className='formLabel'>Subject Type</label>
						<select
							name='subjectType'
							value={subjectType}
							onChange={(e) =>
								setFormData({ ...formData, subjectType: e.target.value })
							}
							required
							className='form-control'>
							<option value=''>Select Subject Type</option>
							<option value='Male'>Male</option>
							<option value='Female'>Female</option>
							<option value='Other'>Other</option>
						</select>
					</div>
					{/* Image Style Selection */}
					<div className='form-group'>
						<label className='formLabel'>Image Style</label>
						<select
							name='imageStyle'
							value={imageStyle}
							onChange={(e) =>
								setFormData({ ...formData, imageStyle: e.target.value })
							}
							required
							className='form-control'>
							<option value=''>Select Image Style</option>
							<option value='Professional Headshot'>
								Professional Headshot
							</option>
							<option value='Astronaut'>Astronaut</option>
							<option value='Futuristic'>Futuristic</option>
						</select>
					</div>
					{/* File Upload */}
					<div className='form-group'>
						<label className='formLabel'>Upload at least 4 Images</label>
						<input
							type='file'
							id='images'
							onChange={onMutate}
							max='4'
							min='4'
							accept='.jpg,.png,.jpeg'
							multiple
							required
						/>
					</div>
					<div>
						<button className='primaryButton' type='submit'>
							Create Headshot
						</button>
					</div>
				</form>
			</main>
		</div>
	);
}

export default NewHeadshot;
