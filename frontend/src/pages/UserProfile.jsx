import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
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

  useEffect(() => {
    // When the user data is fetched or updated, update the local state
    if (user) {
      setFormData({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: '', // Clear the password after update
      })
    }
  }, [user])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    // Dispatch the update user profile action
    dispatch(updateUserProfile({ userId, userData: formData }))
  }

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
        <button type='submit'>Update Profile</button>
      </form>
    </div>
  )
}

export default UserProfile
