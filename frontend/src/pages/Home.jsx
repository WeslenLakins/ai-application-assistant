import { Link } from 'react-router-dom'
import {
  FaLaptop,
  FaListAlt,
  FaSyncAlt,
  FaQuestionCircle,
} from 'react-icons/fa'

function Home() {
  return (
    <>
      <div className='special-offer'>
        <h2>SPECIAL LAUNCH OFFER</h2>
        <p>Create an account and generate 2 cover letters for free!</p>
        <Link to='/register' className='btn special-offer-btn'>
          Sign Up Now
        </Link>
      </div>

      <section className='heading'>
        <h1>
          <FaLaptop /> AI Application Assistant
        </h1>
        <p>How can we help streamline your application process?</p>
      </section>

      <br />
      <Link to='/new-job' className='btn btn-reverse btn-block'>
        <FaSyncAlt /> Generate Cover Letter
      </Link>

      <Link to='/jobs' className='btn btn-block'>
        <FaListAlt /> Review Cover Letters
      </Link>

      <br />
      <br />
      <br />
      <hr />
      <br />
      <br />
      <br />

      <h1>What is AI Application Assistant?</h1>
      <br />
      <br />
      <p>
        AI Application Assistant is a cutting-edge web app designed to
        streamline the job application process. By leveraging advanced AI
        algorithms, our platform crafts personalized cover letters that
        highlight your unique skills and experiences, aligning them perfectly
        with the requirements and qualifications listed in job description of
        the position you are applying for.
      </p>
      <br />
      <br />
      <p>
        Our application is designed to help you stand out from the crowd and
        land your dream job. We are currently offering two free cover letters
        for new users, so sign up today and see what we can do for you!
      </p>
      <br />
      <br />
      <br />

      <Link to='/about' className='btn btn-reverse btn-block'>
        <FaQuestionCircle /> Learn More
      </Link>

      <br />
      <br />
      <br />
    </>
  )
}

export default Home
