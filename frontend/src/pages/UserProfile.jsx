import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { string, object } from "yup";
import { useFormik } from "formik";
import { getUserProfile, updateUserProfile } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const passwordSchema = string().min(6)

const validationSchema = object({
  name: string().required(),
  email: string()
    .matches(
      /^(?!\d+@)\w+([-+.']\w+)*@(?!\d+\.)\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      "Invalid Email"
    )
    .required(),
  newPassword: passwordSchema.label("New Password"),
  currentPassword: passwordSchema.label("Current Password").when("newPassword", (newPassword, schema) => {
    if(newPassword)
      return schema.required()
    return schema
  }),
});

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user, isError, message } = useSelector((state) => state.auth); // Assuming the user's state is in auth
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
  },[isError, message])

  useEffect(() => {
    // When the component mounts, if the user is not already loaded, fetch the user profile
    dispatch(getUserProfile());
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
      dispatch(updateUserProfile({userId: user._id, userData: values}));
    },
  });

  // JSX for the form
  return (
    <div className='user-profile'>
      <h2>My Profile</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Name</label>
          <br />
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={onChange}
          />
        </div>
        <div>
          <label>Email</label>
          <br />
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={onChange}
          />
        </div>
        <div>
          <label>Password</label>
          <br />
          <input
            type='password'
            name='password'
            placeholder='Enter new password'
            value={formData.password}
            onChange={onChange}
          />
        </div>
        <button className="btn-profile" type="submit">Update Profile</button>
        <button className="btn-profile btn-reverse btn-block" onClick={() => navigate("/subscription")}>
          Manage Subscription
        </button>
      </form>
    </div>
  )
}

export default UserProfile;
