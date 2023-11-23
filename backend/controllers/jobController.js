const asyncHandler = require('express-async-handler')
const OpenAI = require('openai')

const User = require('../models/userModel')
const Job = require('../models/jobModel')

const openai = new OpenAI()

// @desc:     Get jobs
// @route:    GET /api/jobs
// @access:   Private
const getJobs = asyncHandler(async (req, res) => {
  // Get the user using the id in the token.
  const user = await User.findById(req.user._id)

  // If the user is not found, throw an error.
  if (!user) {
    res.status(401)
    throw new Error('User not found.')
  }

  // Get the jobs for the user.
  const jobs = await Job.find({ user: req.user._id })

  res.status(200).json(jobs)
})

// @desc:     Get job
// @route:    GET /api/job/:id
// @access:   Private
const getJob = asyncHandler(async (req, res) => {
  // Get the user using the id in the token.
  const user = await User.findById(req.user._id)

  // If the user is not found, throw an error.
  if (!user) {
    res.status(401)
    throw new Error('User not found.')
  }

  // Get the job for the user.
  const job = await Job.findById(req.params.id)

  // If the job is not found, throw an error.
  if (!job) {
    res.status(404)
    throw new Error('Job not found.')
  }

  // If the user is not the owner of the job, throw an error.
  if (job.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized.')
  }

  // Return the job.
  res.status(200).json(job)
})

// @desc:     Create job
// @route:    POST /api/jobs
// @access:   Private
const createJob = asyncHandler(async (req, res) => {
  // Destructure the fields input by the user from the request body.
  const { jobTitle, company, location, jobDescription, resume } = req.body

  // If any of the fields are missing, throw an error.
  if (!jobTitle || !company || !location || !jobDescription || !resume) {
    res.status(400)
    throw new Error('Please fill out all fields.')
  }

  // Get the user using the id in the token.
  const user = await User.findById(req.user._id)

  // If the user is not found, throw an error.
  if (!user) {
    res.status(401)
    throw new Error('User not found.')
  }

  // Generate the prompt for the coverLetter to send to OpenAI.
  const prompt = `You will be given a Job Title, Company, Location, and a Job Description along with the the Job Applicant's Resume. You will write a cover letter for the job applicant that mataches their past experiences from their Resume with the Job Description. Rather than simply outlining the applicant's past experiences, you will give more detail and explain how those experiences will help the applicant succeed at the Company and the Job. Write the cover letter in the same language used in the job description. You will write the cover letter in a modern style with a professional tone without being too formal, as a modern employee might do naturally.  Job Applicant's information -- Job Title: ${jobTitle} Company: ${company} Location: ${location} Job Description: ${jobDescription} Resume: ${resume}`

  // Generate the coverLetter using OpenAI.
  let coverLetter
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
    })
    coverLetter = completion.choices[0].message.content
  } catch (error) {
    console.error('Error in OpenAI API call: ', error)
    res.status(500)
    throw new Error('Error in OpenAI API call.')
  }

  // Create a new job with the user's id, the job title, company, location, job description, resume, and cover letter.
  const job = await Job.create({
    user: req.user._id,
    jobTitle,
    company,
    location,
    jobDescription,
    resume,
    coverLetter,
  })

  // Return the created job.
  res.status(201).json(job)
})

// @desc:     Delete job
// @route:    DELETE /api/jobs/:id
// @access:   Private
const deleteJob = asyncHandler(async (req, res) => {
  // Get the user using the id in the token.
  const user = await User.findById(req.user._id)

  // If the user is not found, throw an error.
  if (!user) {
    res.status(401)
    throw new Error('User not found.')
  }

  // Get the jobs for the user.
  const job = await Job.findById(req.params.id)

  // If the job is not found, throw an error.
  if (!job) {
    res.status(404)
    throw new Error('Job not found.')
  }

  // If the user is not the owner of the job, throw an error.
  if (job.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized.')
  }

  // Delete the job.
  await Job.findByIdAndDelete(req.params.id)

  // Return success.
  res.status(200).json({ success: true })
})

// @desc:     Update job
// @route:    PUT /api/jobs/:id
// @access:   Private
const updateJob = asyncHandler(async (req, res) => {
  // Get the user using the id in the token.
  const user = await User.findById(req.user._id)

  // If the user is not found, throw an error.
  if (!user) {
    res.status(401)
    throw new Error('User not found.')
  }

  // Get the jobs for the user.
  const job = await Job.findById(req.params.id)

  // If the job is not found, throw an error.
  if (!job) {
    res.status(404)
    throw new Error('Job not found.')
  }

  // If the user is not the owner of the job, throw an error.
  if (job.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized.')
  }

  // Update the job.
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  // Return the job.
  res.status(200).json(updatedJob)
})

module.exports = {
  getJobs,
  getJob,
  createJob,
  deleteJob,
  updateJob,
}
