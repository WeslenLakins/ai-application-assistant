import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as Yup from "yup";
import { useFormik } from "formik";
import { getUserProfile, updateUserProfile } from '../features/auth/authSlice'

const UserProfile = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth) // Assuming the user's state is in auth
  const { userId } = useParams() // Get the user ID from the URL
  console.log('UserId:', userId)

  // State for form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '', // It's not typical to handle passwords this way
  })

  useEffect(() => {
    // When the component mounts, if the user is not already loaded, fetch the user profile
    dispatch(getUserProfile(userId))
  }, [dispatch, userId])

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .matches(
        /^(?!\d+@)\w+([-+.']\w+)*@(?!\d+\.)\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        "Invalid Email"
      )
      .required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters"),
  });

  const formik = useFormik({
    initialValues: {
      _id: user ? user._id : "",
      name: user ? user.name : "",
      email: user ? user.email : "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const updatedData = {
        ...formData,
        currentPassword,
        newPassword: formData.password,
      }
      dispatch(updateUserProfile({ userId, userData: updatedData }))
      dispatch(updateUserProfile(values));
    },
  });

  const [currentPassword, setCurrentPassword] = useState('')

  const onChangeCurrentPassword = (e) => {
    setCurrentPassword(e.target.value)
  }

  // JSX for the form
  return (
    <div className="user-profile">
      <h2>My Profile</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Name</label>
          <br />
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </div>
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>

        <div>
          <label>Current Password</label>
          <br />
          <input
            type='password'
            name='currentPassword'
            placeholder='Enter current password'
            value={currentPassword}
            onChange={onChangeCurrentPassword}
          />
        </div>

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            name="password"
            placeholder="Enter new password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UserProfile;
