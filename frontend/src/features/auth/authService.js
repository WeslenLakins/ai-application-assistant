/*
The code below is a JavaScript module that provides an authentication service for a web application. It uses the axios library to make HTTP requests to an API. Here's a breakdown of what the code does:

    The axios module is imported at the top of the file. This is a popular library for making HTTP requests in JavaScript.

    The API_URL constant is defined. This is the base URL for the user-related API endpoints.

    The register function is an asynchronous function that takes a userData object as an argument. It sends a POST request to the API to create a new user with the provided data. If the API response includes data, it stores the user data in local storage. It then returns the data from the API response.

    The login function is similar to the register function. It also takes a userData object as an argument, but it sends a POST request to a different API endpoint (/api/users/login). If the API response includes data, it stores the user data in local storage. It then returns the data from the API response.

    The logout function removes the user data from local storage. This effectively logs out the user.

    The authService object is created. This object includes the register, login, and logout functions. This makes it easy to import and use these functions in other parts of the application.

    Finally, the authService object is exported as the default export from this module. This means it can be imported and used in other parts of the application.

*/
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

// Fetch user profile data using the API endpoint /api/users/profile (requires authentication) and return the response data as JSON.
const getUserProfile = async (userData, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + 'profile', userData, config)

  return response.data
}

// Update user profile data using the API endpoint /api/users/profile (requires authentication) and return the response data as JSON.
const updateUserProfile = async (userData, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + 'profile', userData, config)
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
