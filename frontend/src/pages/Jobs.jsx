import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getJobs, reset } from '../features/jobs/jobSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import JobItem from '../components/JobItem'

function Jobs() {
  const { jobs, isLoading, isSuccess } = useSelector((state) => state.jobs)

  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    dispatch(getJobs())
  }, [dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <BackButton url='/' />
      <h1>Cover Letters</h1>
      <div className='tickets'>
        <div className='ticket-headings'>
          <div>Date Created</div>
          <div>Position Title</div>
          <div>Company Name</div>
          <div></div>
        </div>
        {jobs.map((job) => (
          <JobItem key={job._id} job={job} />
        ))}
      </div>
    </>
  )
}

export default Jobs
