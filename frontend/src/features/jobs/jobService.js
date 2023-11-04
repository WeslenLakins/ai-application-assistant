import axios from 'axios'

const API_URL = '/api/jobs/'

// Create new job
const createJob = async (jobData, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, jobData, config)

  return response.data
}

// Get user jobs
const getJobs = async (token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Get user job
const getJob = async (jobId, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + jobId, config)

  return response.data
}

const jobService = {
  createJob,
  getJobs,
  getJob,
}

export default jobService
