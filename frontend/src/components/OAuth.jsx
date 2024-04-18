import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { useDispatch } from "react-redux";
import { signInSuccess, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import googleIcon from "../assets/svg/googleIcon.svg";
import authService from "../features/auth/authService"; // Ensure this path is correct based on your project structure

function OAuth() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onGoogleClick = async () => {
		try {
			const auth = getAuth();
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);
			// Destructure the user object from the result
			const { user } = result;

			// Prepare user data that will be used for Firestore and backend
			const userData = {
				email: user.email,
				name: user.displayName,
				isAdmin: false, // Default to false or determine based on your app's logic
				isOAuth: true, // Flag to indicate OAuth sign-in method
			};

			// Firestore: Check if user exists
			const docRef = doc(db, "users", user.uid);
			const docSnap = await getDoc(docRef);

			if (!docSnap.exists()) {
				// If user does not exist in Firestore, create them
				await setDoc(docRef, {
					...userData,
					createdAt: serverTimestamp(),
				});
			}

			// Regardless of Firestore, attempt to sign in or create the user in MongoDB through your backend
			const backendResponse = await authService.oauthSignIn(userData);

			// If successful, dispatch signInSuccess to update your global state
			if (backendResponse) {
				dispatch(signInSuccess({ user: backendResponse }));
				navigate("/");
			} else {
				throw new Error("Backend sign-in or user creation failed");
			}
		} catch (error) {
			toast.error(error.message || "Could not sign in with Google");
			dispatch(reset());
		}
	};

	return (
		<div className='socialLogin'>
			<button className='socialIconDiv' onClick={onGoogleClick}>
				<img src={googleIcon} alt='Google sign-in' className='socialIconImg' />
				<span>Sign in with Google</span>
			</button>
		</div>
	);
}

export default OAuth;
