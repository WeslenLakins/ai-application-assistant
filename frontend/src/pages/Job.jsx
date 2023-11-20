import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { getJob, reset } from '../features/jobs/jobSlice'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { get } from 'mongoose'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { jsPDF } from 'jspdf'

function Job() {
  const { job, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.jobs
  )

  const params = useParams()
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

  const downloadCoverLetter = () => {
    const doc = new jsPDF()
    const text = doc.splitTextToSize(job.coverLetter, 180) // Split the text to fit within a width of 180
    doc.text(text, 10, 10) // Use the split text here
    doc.save('AIApplicationAssistant-CoverLetter.pdf')
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
        <br />
        <div style={{ margin: '10px', lineHeight: '1.6' }}>
          {job.coverLetter &&
            job.coverLetter.split('\n').map((paragraph, index) => (
              <p key={index} style={{ marginBottom: '20px' }}>
                {paragraph}
              </p>
            ))}
        </div>
        <br />
        <CopyToClipboard text={job.coverLetter}>
          <button
            style={{
              backgroundColor: '#525252',
              color: 'white',
              padding: '14px 20px',
              margin: '20px 10px', // Increased margin
              border: 'none',
              borderRadius: '5px', // Rounded corners
              boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)', // Shadow effect
              cursor: 'pointer',
              width: '20%',
              transition: 'all 0.3s ease 0s', // Smooth transition
            }}>
            Copy Cover Letter
          </button>
        </CopyToClipboard>
        <button
          onClick={downloadCoverLetter}
          style={{
            backgroundColor: '#000000',
            color: 'white',
            padding: '14px 20px',
            margin: '20px 10px', // Increased margin
            border: 'none',
            borderRadius: '5px', // Rounded corners
            boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)', // Shadow effect
            cursor: 'pointer',
            width: '20%',
            transition: 'all 0.3s ease 0s', // Smooth transition
          }}>
          Download Cover Letter
        </button>
      </header>
    </div>
  )
}

export default Job
