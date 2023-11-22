import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from './Spinner'
import SubscribedRoute from './SubscribedRoute'

const PrivateRoute = ({ checkSubscription }) => {
  const { loggedIn, checkingStatus } = useAuthStatus()

  if (checkingStatus) {
    return <Spinner />
  }

  return loggedIn ? checkSubscription ? <SubscribedRoute /> : <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute
