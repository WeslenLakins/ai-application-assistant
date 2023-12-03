/*
The selected code is a React component named Header. This component is used to display the navigation bar at the top of the application. Here's a breakdown of what the code does:

    Several modules are imported at the top of the file. These include icons from react-icons/fa, hooks and functions from react-router-dom and react-redux, and actions from authSlice.

    The Header function is a functional component that uses the useNavigate hook to programmatically navigate, useDispatch to dispatch Redux actions, and useSelector to select data from the Redux store.

    The onLogout function is used to handle logout. It dispatches the logout and reset actions, and navigates to the home page.

    In the returned JSX, it displays a logo and a list of navigation links. The links change depending on whether the user is logged in or not.

    If the user is logged in, it displays a logout button. When clicked, it calls the onLogout function.

    If the user is not logged in, it displays links to the login and register pages.

    Finally, the Header component is exported as the default export from this module, so it can be imported and used in other parts of the application.
*/

import {
  FaSignInAlt,
  FaHome,
  FaSignOutAlt,
  FaUser,
  FaUserCircle,
  FaQuestionCircle,
} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { reset as subscriptionReset } from '../features/subscription/subscriptionSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    dispatch(subscriptionReset())
    navigate('/')
  }

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>
          <FaHome /> Home
        </Link>
        <Link to='/about'>
          <FaQuestionCircle /> About
        </Link>
      </div>
      <ul>
        {user ? (
          <>
            <li>
              <Link to={`/profile`}>
                <FaUserCircle /> Profile
              </Link>
            </li>
            <li>
              <button className='btn' onClick={onLogout}>
                <FaSignOutAlt />
                Sign Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Sign In
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header
