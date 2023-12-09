import { Link } from 'react-router-dom'
import { FaLaptop, FaListAlt, FaSyncAlt } from 'react-icons/fa'

function Home() {
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
      <Link to='/new-job' className='btn btn-reverse btn-block'>
        <FaSyncAlt /> Generate Cover Letter
      </Link>

      <Link to='/jobs' className='btn btn-block'>
        <FaListAlt /> Review Cover Letters
      </Link>

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

export default Home
