const express = require('express')
const router = express.Router()
const {
  getJobs,
  getJob,
  createJob,
  deleteJob,
  updateJob,
} = require('../controllers/jobController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getJobs).post(protect, createJob)

router
  .route('/:id')
  .get(protect, getJob)
  .delete(protect, deleteJob)
  .put(protect, updateJob)

module.exports = router
