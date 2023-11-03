import { useState } from 'react'
import { useSelector } from 'react-redux'

function NewJob() {
  // eslint-disable-next-line no-unused-vars
  const user = useSelector((state) => state.auth)

  const [jobTitle, setJobTitle] = useState('')
  const [company, setCompany] = useState('')
  const [location, setLocation] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [resume, setResume] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <section className='heading'>
        <h1>Cover Letter & Job Application</h1>
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
              placeholder='Company name'
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
              placeholder='Copy & paste the job description here'
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}></textarea>
          </div>
          <div className='form-group'>
            <label htmlFor='resume'>Resume</label>
            <textarea
              name='resume'
              id='resume'
              className='form-control'
              placeholder='Copy & paste your resume here'
              value={resume}
              onChange={(e) => setResume(e.target.value)}></textarea>
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>
              Generate Cover Letter & Job Application
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewJob
