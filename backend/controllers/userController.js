// Bring in express-async-handler to handle errors, bcryptjs to hash passwords, jsonwebtoken to create tokens, and the User model.
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

// @desc:     Register a new user.
// @route:    /api/users
// @access:   Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  // Validation & Error Handling
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please complete all fields to register.')
  }

  // Check if user already exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists.')
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create the user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  })

  // If the user is created, send back the user object. Otherwise, throw an error.
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data.')
  }
})

// @desc:     Login a user.
// @route:    /api/users/login
// @access:   Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  // If the user exists and the password is correct, send back the user object. Otherwise, throw an error.
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid credentials.')
  }
})

// Generate token function
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
}
