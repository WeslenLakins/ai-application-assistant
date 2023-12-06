import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Analytics } from '@vercel/analytics/react'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NewJob from './pages/NewJob'
import Jobs from './pages/Jobs'
import Job from './pages/Job'
import UserProfile from './pages/UserProfile'
import Subscription from './pages/Subscription'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Contact from './pages/Contact'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Cookies from './pages/Cookies'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/terms' element={<Terms />} />
            <Route path='/privacy' element={<Privacy />} />
            <Route path='/cookies' element={<Cookies />} />
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
          <Footer />
        </div>
      </Router>
      <ToastContainer />
      <Analytics />
    </>
  )
}

export default App
