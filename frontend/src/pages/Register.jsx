import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { track } from "@vercel/analytics";
import {
	createUserWithEmailAndPassword,
	getAuth,
	updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import OAuth from "../components/OAuth";

function Register() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		passwordConfirm: "",
	});

	const { name, email, password, passwordConfirm } = formData;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		// Redirect if logged in
		if (isSuccess && user) {
			navigate("/");
		}

		dispatch(reset());
	}, [isError, isSuccess, isLoading, message, user, navigate, dispatch]);

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		if (password !== passwordConfirm) {
			toast.error("Passwords do not match");
			return; // Stop execution if passwords don't match
		}

		try {
			// Step 1: Create user in Firebase Authentication
			const auth = getAuth();
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;

			// Optional: Update profile with additional details, like displayName
			await updateProfile(auth.currentUser, {
				displayName: name,
			});

			// Step 2: Create a document in Firestore with the user's details
			await setDoc(doc(db, "users", user.uid), {
				name,
				email,
				createdAt: serverTimestamp(),
			});

			// Step 3: Dispatch the signUp action for MongoDB creation
			// Assuming your signUp action expects user data and the Firebase user UID
			const userDataForMongoDB = {
				name,
				email,
				password,
			};
			dispatch(register(userDataForMongoDB));

			// Track the event in Vercel Analytics
			track("user_registered", {
				email,
				name,
			});

			// Step 4: Handle success case, like redirecting or showing a message
			toast.success("Account created successfully");
			navigate("/"); // Redirect the user after successful account creation
		} catch (error) {
			console.error("Error creating user:", error.message);
			toast.error("Error creating account. Please try again.");
		}
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<section className='heading'>
				<h1>
					<FaUser /> Sign Up
				</h1>
				<p>
					Create an account for free. Get hired. No credit card information
					required.
				</p>
			</section>

			<section className='form'>
				<form onSubmit={onSubmit}>
					<div className='form-group'>
						<input
							type='text'
							className='form-control'
							id='name'
							name='name'
							value={name}
							onChange={onChange}
							placeholder='Enter your name'
							required
						/>
					</div>
					<div className='form-group'>
						<input
							type='email'
							className='form-control'
							id='email'
							name='email'
							value={email}
							onChange={onChange}
							placeholder='Enter your email'
							required
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							className='form-control'
							id='password'
							name='password'
							value={password}
							onChange={onChange}
							placeholder='Enter your password'
							required
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							className='form-control'
							id='passwordConfirm'
							name='passwordConfirm'
							value={passwordConfirm}
							onChange={onChange}
							placeholder='Confirm your password'
							required
						/>
					</div>
					<div className='form-group'>
						<button type='submit' className='btn btn-block'>
							Submit
						</button>
					</div>
				</form>
				<OAuth />
			</section>
		</>
	);
}

export default Register;
