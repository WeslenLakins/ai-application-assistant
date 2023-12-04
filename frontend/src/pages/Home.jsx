/*
The code below is a React component named Home. This component appears to be the home page of a ticketing system or help desk application. Here's a breakdown of what the code does:

    Several modules are imported at the top of the file. These include Link from react-router-dom for navigation, and three icons (FaLaptop, FaQuestionCircle, FaTicketAlt) from react-icons/fa.

    The Home function is a functional component that returns a JSX structure. This structure represents the main layout of the home page.

    Inside the returned JSX, a section with a class of 'heading' is used to display a heading and a subheading. The FaLaptop icon is used in the heading.

    Two Link components are used to create navigation buttons. The to prop is used to specify the URL path to navigate to when the button is clicked. The className prop is used to apply CSS classes to the buttons. The FaQuestionCircle and FaTicketAlt icons are used in the buttons.

    The first Link navigates to '/new-ticket' and is used to create a new ticket. The second Link navigates to '/tickets' and is used to view the user's tickets.

    Finally, the Home component is exported as the default export from this module, so it can be imported and used in other parts of the application.
*/

import { Link } from 'react-router-dom'
import {
  FaLaptop,
  FaListAlt,
  FaSyncAlt,
  FaQuestionCircle,
} from 'react-icons/fa'

function Home() {
  const [activeIndex, setActiveIndex] = useState(0)

  const images = [
    <img
      src='https://onedrive.live.com/embed?resid=4B1C8510CEF67D18%218041&authkey=%21AN41AK7mik5Br0k&width=1069&height=1765'
      width='1069'
      height='1765'
    />,
    <img
      src='https://onedrive.live.com/embed?resid=4B1C8510CEF67D18%218042&authkey=%21AIOp_iBCEzwEoAw&width=1075&height=1764'
      width='1075'
      height='1764'
    />,
    <img
      src='https://onedrive.live.com/embed?resid=4B1C8510CEF67D18%218043&authkey=%21ANel_kPKqFJaetw&width=1075&height=1758'
      width='1075'
      height='1758'
    />,
  ]

  const goToPrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  return (
    <>
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

      <div className='special-offer'>
        <h2>Special Launch Offer</h2>
        <p>Create Two Cover Letters for Free by Creating an Account!</p>
        <Link to='/register' className='btn special-offer-btn'>
          Sign Up Now
        </Link>
      </div>

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

      <div className='carousel'>
        <div className='carousel-inner'>
          {images.map((src, index) => (
            <div
              key={index}
              className={index === activeIndex ? 'active' : 'inactive'}>
              <img src={src} alt={`Slide ${index}`} />
            </div>
          ))}
        </div>
        <button onClick={goToPrev}>Previous</button>
        <button onClick={goToNext}>Next</button>
      </div>
    </>
  )
}

export default Home
