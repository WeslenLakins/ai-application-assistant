import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUserProfile } from "../features/auth/authSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // When the component mounts, if the user is not already loaded, fetch the user profile
    if (!user) {
      dispatch(getUserProfile());
    }
  }, [dispatch, user]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
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
      dispatch(updateUserProfile(values));
    },
  });

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
