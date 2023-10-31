/*
The code below is a React component named Login. This component is used to handle user login. Here's a breakdown of what the code does:

    Several modules are imported at the top of the file. These include hooks from react and react-redux, toast from react-toastify, useNavigate from react-router-dom, an icon from react-icons/fa, actions from authSlice, and a Spinner component.

    The Login function is a functional component that uses the useState hook to manage form data, useDispatch to dispatch Redux actions, and useSelector to select data from the Redux store.

    The useEffect hook is used to handle side effects. If there's an error, it displays a toast notification. If the user is successfully logged in, it redirects to the home page. It also resets the auth state when the component is unmounted.

    The onChange function is used to handle changes to the form inputs. It updates the form data in the component's state.

    The onSubmit function is used to handle form submission. It prevents the default form submission, creates a userData object from the form data, and dispatches the login action with userData.

    If the auth state is loading, it returns a Spinner component.

    In the returned JSX, it displays a heading and a form. The form includes fields for email and password, and a submit button. The onChange function is attached to the input fields to handle changes, and the onSubmit function is attached to the form to handle submission.

    Finally, the Login component is exported as the default export from this module, so it can be imported and used in other parts of the application.
*/

import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    // Redirect if logged in
    if (isSuccess && user) {
      navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, isLoading, message, user, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please login to access your account.</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='Enter your email'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Enter your password'
              required
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login
