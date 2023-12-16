import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createJob, reset } from '../features/jobs/jobSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function NewJob() {
  // eslint-disable-next-line no-unused-vars
  const user = useSelector((state) => state.auth)
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.jobs
  )

  const [jobTitle, setJobTitle] = useState('')
  const [company, setCompany] = useState('')
  const [location, setLocation] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [resume, setResume] = useState('')

  // Initialize dispatch and navigate
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
      dispatch(reset())
    }

    if (isSuccess) {
      dispatch(reset())
      navigate('/jobs')
    }

    // dispatch(reset());
  }, [isError, isSuccess, message, dispatch, navigate])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createJob({ jobTitle, company, location, jobDescription, resume }))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <BackButton url='/' />
      <section className='heading'>
        <h1>Generate Cover Letter</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='jobTitle'>Job Title</label>
            <input
              type='text'
              name='jobTitle'
              id='jobTitle'
              className='form-control'
              placeholder='Job title'
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}></input>
          </div>
          <div className='form-group'>
            <label htmlFor='company'>Company</label>
            <input
              type='text'
              name='company'
              id='company'
              className='form-control'
              placeholder='Company name or client name'
              value={company}
              onChange={(e) => setCompany(e.target.value)}></input>
          </div>
          <div className='form-group'>
            <label htmlFor='location'>Location</label>
            <input
              type='text'
              name='location'
              id='location'
              className='form-control'
              placeholder='Location'
              value={location}
              onChange={(e) => setLocation(e.target.value)}></input>
          </div>
          <div className='form-group'>
            <label htmlFor='jobDescription'>Job Description</label>
            <textarea
              name='jobDescription'
              id='jobDescription'
              className='form-control'
              placeholder='Copy & paste the job description or project requirements here'
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}></textarea>
          </div>
          <div className='form-group'>
            <label htmlFor='resume'>Resume</label>
            <textarea
              name='resume'
              id='resume'
              className='form-control'
              placeholder='Copy & paste your resume or add your skills & experience here'
              value={resume}
              onChange={(e) => setResume(e.target.value)}></textarea>
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Generate Cover Letter</button>
          </div>
        </form>
      </section>
      <br />
      <br />
      <br />
      <h1>Important Note</h1>
      <p>
        It can take up to 2 minutes to generate a new cover letter. Please do
        not exit or refresh the page until your new cover letter has been
        created.
      </p>
      <br />
      <br />
      <br />
    </>
  )
}

export default NewJob
