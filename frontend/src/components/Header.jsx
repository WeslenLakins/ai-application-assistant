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
      <div className='header-left'>
        <div className='logo'>
          <Link to='/'>
            <FaHome /> Home
          </Link>
        </div>
        <div className='logo'>
          <Link to='/about'>
            <FaQuestionCircle /> About
          </Link>
        </div>
      </div>
      <div className='header-right'>
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
      </div>
    </header>
  )
}

export default Header
