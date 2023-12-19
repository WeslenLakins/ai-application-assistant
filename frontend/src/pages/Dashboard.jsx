import { Link } from 'react-router-dom'
import { FaLaptop, FaListAlt, FaSyncAlt } from 'react-icons/fa'
import { track } from '@vercel/analytics'

function Dashboard() {
  // Event handler for 'Generate Cover Letter' button click
  const handleGenerateCoverLetterClick = () => {
    track('Generate Cover Letter Clicked') // Tracking event
  }

  // Event handler for 'Review Cover Letters' button click
  const handleReviewCoverLettersClick = () => {
    track('Review Cover Letters Clicked') // Tracking event
  }

  const heroImageURL =
    'https://onedrive.live.com/embed?resid=4B1C8510CEF67D18%218220&authkey=%21AIm9UaIBUns9Uh0&width=512&height=512'

  return (
    <>
      <section className='heading'>
        <h1>
          <FaLaptop /> AI Application Assistant
        </h1>
        <p>How can we help streamline your application process?</p>
      </section>

      <br />
      <section className='sub-heading'>
        <h2>Cover Letters</h2>
      </section>
      <Link
        to='/new-job'
        className='btn btn-reverse btn-block'
        onClick={handleGenerateCoverLetterClick}>
        <FaSyncAlt /> Generate Cover Letter
      </Link>

      <Link
        to='/jobs'
        className='btn btn-block'
        onClick={handleReviewCoverLettersClick}>
        <FaListAlt /> Review Cover Letters
      </Link>

      <br />

      <div className='hero-image-container'>
        <img
          src={heroImageURL}
          alt='Job seeker with cover letters'
          className='hero-image'
        />
      </div>
      <br />
      <section className='sub-heading'>
        <h2>Resumes</h2>

        <p>Coming Soon...</p>
      </section>

      <br />
      <section className='sub-heading'>
        <h2>Interviews</h2>

        <p>Coming Soon...</p>
      </section>

      <br />
      <section className='sub-heading'>
        <h2>Networking</h2>

        <p>Coming Soon...</p>
      </section>

      <br />
      <br />
    </>
  )
}

export default Dashboard
