import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUserProfile } from "../features/auth/authSlice";
import { useNavigate } from "react-router";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // Assuming the user's state is in auth
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "", // It's not typical to handle passwords this way
  });

  useEffect(() => {
    // When the component mounts, if the user is not already loaded, fetch the user profile
    if (!user) {
      dispatch(getUserProfile());
    }
  }, [dispatch, user]);

  useEffect(() => {
    // When the user data is fetched or updated, update the local state
    if (user) {
      setFormData({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: "", // Clear the password after update
      });
    }
  }, [user]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Dispatch the update user profile action
    dispatch(updateUserProfile(formData));
  };

  // JSX for the form
  return (
    <>
      <div className="user-profile">
        <h2>My Profile</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter new password"
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
    </>
  );
};

export default UserProfile;
