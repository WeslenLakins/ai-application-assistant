import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { getJob } from '../features/jobs/jobSlice'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

function Job() {
  const { job, isLoading, isError, message } = useSelector(
    (state) => state.jobs
  )

  const dispatch = useDispatch()
  const { jobId } = useParams()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getJob(jobId))
    // eslint-disable-next-line
  }, [isError, message, jobId])

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Something Went Wrong</h3>
  }

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton url='/jobs' />
        <br />
        <h1>Job Details</h1>
        <p>
          <em>
            Date Created: {new Date(job.createdAt).toLocaleString('en-US')}
          </em>
        </p>
        <br />
        <br />
        <h3>Job Title:</h3>
        <p>{job.jobTitle}</p>
        <br />
        <h3>Company:</h3>
        <p>{job.company}</p>
        <br />
        <h3>Location:</h3>
        <p>{job.location}</p>
        <br />
        <br />
        <hr />
        <h1>Cover Letter</h1>
        <p>{job.coverLetter}</p>
        <br />
      </header>
    </div>
  )
}

export default Job
