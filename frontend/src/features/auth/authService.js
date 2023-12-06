import axios from 'axios'

const API_URL = '/api/users/'

// Register a new user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// Login a user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// Logout a user
const logout = () => localStorage.removeItem('user')

// Fetch user profile data using the API endpoint /api/user/:userId
const getUserProfile = async (userId, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + userId, config)

  return response.data
}

// Update user profile data using the API endpoint /api/user/:userId
const updateUserProfile = async (userData, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(API_URL + 'me', userData, config)
  return response.data
}

const authService = {
  register,
  logout,
  login,
  getUserProfile,
  updateUserProfile,
}

export default authService
