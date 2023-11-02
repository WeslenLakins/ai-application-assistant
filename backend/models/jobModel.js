// Bring in mongoose
const mongoose = require('mongoose')

// Create a job schema model
const jobSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    jobTitle: {
      type: String,
      required: [true, 'job title'],
    },
    company: {
      type: String,
      required: [true, 'company'],
    },
    location: {
      type: String,
      required: [true, 'location'],
    },
    jobDescription: {
      type: String,
      required: [true, 'copy & paste the job description'],
    },
    resume: {
      type: String,
      required: [true, 'copy & paste content of resume/cv'],
    },
    coverLetter: {
      type: String,
      required: [true, 'cover letter'],
    },
  },
  {
    timestamps: true,
  }
)

// Export the job model schema as a model named 'Job' using the userSchema model and the mongoose.model() method.
module.exports = mongoose.model('Job', jobSchema)
