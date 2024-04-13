import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { string, object } from "yup";
import { useFormik } from "formik";
import { getUserProfile, updateUserProfile } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const passwordSchema = string().min(6);

const validationSchema = object({
	name: string().required(),
	email: string()
		.matches(
			/^(?!\d+@)\w+([-+.']\w+)*@(?!\d+\.)\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
			"Invalid Email"
		)
		.required(),
	newPassword: passwordSchema.label("New Password"),
	currentPassword: passwordSchema
		.label("Current Password")
		.when("newPassword", ([newPassword], schema) => {
			if (newPassword) return schema.required();
			return schema;
		}),
});

const UserProfile = () => {
	const dispatch = useDispatch();
	const { user, isError, message } = useSelector((state) => state.auth); // Assuming the user's state is in auth
	const navigate = useNavigate();

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}
	}, [isError, message]);

	useEffect(() => {
		// When the component mounts, if the user is not already loaded, fetch the user profile
		dispatch(getUserProfile("me"));
	}, [dispatch]);
	const formik = useFormik({
		initialValues: {
			_id: user ? user._id : "",
			name: user ? user.name : "",
			email: user ? user.email : "",
			newPassword: "",
			currentPassword: "",
		},
		validationSchema,
		onSubmit: (values) => {
			dispatch(updateUserProfile({ userData: values }));
		},
	});

	// JSX for the form
	return (
		<div className='user-profile'>
			<h2>My Profile</h2>

			<form onSubmit={formik.handleSubmit}>
				<div className='form-group'>
					<label>Name</label>
					<input
						type='text'
						name='name'
						className='form-control'
						value={formik.values.name}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					{formik.touched.name && formik.errors.name ? (
						<div className='error'>{formik.errors.name}</div>
					) : null}
				</div>
				<div className='form-group'>
					<label>Email</label>
					<input
						type='email'
						name='email'
						className='form-control'
						value={formik.values.email}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					{formik.touched.email && formik.errors.email ? (
						<div className='error'>{formik.errors.email}</div>
					) : null}
				</div>

				<div className='form-group'>
					<label>Current Password</label>
					<input
						type='password'
						name='currentPassword'
						className='form-control'
						placeholder='Enter current password'
						value={formik.values.currentPassword}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					{formik.touched.currentPassword && formik.errors.currentPassword ? (
						<div className='error'>{formik.errors.currentPassword}</div>
					) : null}
				</div>

				<div className='form-group'>
					<label>New Password</label>
					<input
						type='password'
						name='newPassword'
						className='form-control'
						placeholder='Enter new password'
						value={formik.values.newPassword}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					{formik.touched.newPassword && formik.errors.newPassword ? (
						<div className='error'>{formik.errors.newPassword}</div>
					) : null}
				</div>
				<button className='btn-profile' type='submit'>
					Update Profile
				</button>
				<button
					className='btn-profile btn-reverse btn-block'
					onClick={() =>
						(window.location.href =
							"https://billing.stripe.com/p/login/dR6cPA9kG3c4dX2288")
					}>
					Manage Subscription
				</button>
				<button
					className='btn-profile'
					onClick={() => navigate("/subscription")}>
					Cancel Subscription
				</button>
				{user && user.isAdmin && (
					<button className='btn-profile btn-reverse btn-block'>
						<Link to='/new-post'>Create New Post</Link>
					</button>
				)}
			</form>
		</div>
	);
};

export default UserProfile;
