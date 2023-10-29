// Bring in express, express router, the registerUser, loginUser, and getMe functions from the userController, and the protect function from the authMiddleware.
const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

// Routes
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

module.exports = router
