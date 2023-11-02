const express = require('express')
const router = express.Router()
const { getJobs, createJob } = require('../controllers/jobController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getJobs).post(protect, createJob)

module.exports = router
