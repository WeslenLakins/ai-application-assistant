/*
The following code is a React component named App. This component sets up the main structure of a web application, including routing and toast notifications. Here's a breakdown of what the code does:

    Several modules are imported at the top of the file. These include react-router-dom for routing, react-toastify for toast notifications, and several custom components and pages.

    The App function is a functional component that returns a JSX structure. This structure represents the main layout of the web application.

    Inside the returned JSX, a Router component is used to set up routing for the application. This component is a wrapper for the rest of the application and provides routing context.

    Inside the Router, a div with a class of 'container' is used to wrap the main content of the application.

    The Header component is included, which likely contains the main navigation for the application.

    The Routes component is used to define the application's routes. Each Route component inside Routes defines a single route. The path prop is used to specify the URL path for the route, and the element prop is used to specify the component that should be rendered when the route is matched. In this case, there are three routes: '/', '/login', and '/register', which render the Home, Login, and Register components respectively.

    Outside the Router, but still within the returned JSX, the ToastContainer component is included. This component is part of react-toastify and is used to display toast notifications.

    Finally, the App component is exported as the default export from this module, so it can be imported and used in other parts of the application.
*/

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Analytics } from '@vercel/analytics/react'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NewJob from './pages/NewJob'
import Jobs from './pages/Jobs'
import Job from './pages/Job'
import UserProfile from './pages/UserProfile'
import Subscription from './pages/Subscription'
import About from './pages/About'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/new-job' element={<PrivateRoute checkSubscription />}>
              <Route path='/new-job' element={<NewJob />} />
            </Route>
            <Route path='/jobs' element={<PrivateRoute />}>
              <Route path='/jobs' element={<Jobs />} />
            </Route>
            <Route path='/job/:jobId' element={<PrivateRoute />}>
              <Route path='/job/:jobId' element={<Job />} />
            </Route>
            <Route path='/profile' element={<PrivateRoute />}>
              <Route path='/profile' element={<UserProfile />} />
            </Route>
            <Route path='/subscription' element={<PrivateRoute />}>
              <Route path='/subscription' element={<Subscription />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
      <Analytics />
    </>
  )
}

export default App
