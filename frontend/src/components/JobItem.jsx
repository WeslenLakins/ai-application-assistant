import { Link } from 'react-router-dom'

function JobItem({ job }) {
  return (
    <div className='ticket'>
      <div>{new Date(job.createdAt).toLocaleString('en-US')}</div>
      <div>{job.jobTitle}</div>
      <div>{job.company}</div>
      <Link to={`/job/${job._id}`} className='btn btn-reverse btn-sm'>
        View
      </Link>
    </div>
  )
}

export default JobItem
