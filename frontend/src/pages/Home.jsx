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
import { FaLaptop, FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'

function Home() {
  return (
    <>
      <section className='heading'>
        <h1>
          <FaLaptop /> What do you need help with?
        </h1>
        <p>Please choose from an option below.</p>
      </section>

      <Link to='/new-ticket' className='btn btn-reverse btn-block'>
        <FaQuestionCircle /> Create New Ticket
      </Link>

      <Link to='/tickets' className='btn btn-block'>
        <FaTicketAlt /> View My Tickets
      </Link>
    </>
  )
}

export default Home
