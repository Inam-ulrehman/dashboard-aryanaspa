import { React, useState, useRef } from 'react'
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import {
  forgetPasswordToggle,
  loginUserThunk,
  registerUserThunk,
} from '../features/user/userSlice'
import ForgetPassword from '../components/user/ForgetPassword'

const Register = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state)

  const [login, setLogin] = useState(true)
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    const name = nameRef.current?.value.toLowerCase()
    const email = emailRef.current.value.toLowerCase()
    const password = passwordRef.current.value

    if (!email || !password || (!login && !name)) {
      toast.error('Please enter your credentials.')
      return
    }
    if (login) {
      dispatch(loginUserThunk({ email, password }))
      return
    } else {
      dispatch(registerUserThunk({ name, email, password }))
    }
  }
  // handle Login
  const handleLogin = () => {
    setLogin(!login)
  }

  // handle Forget Password
  const handleForgetPassword = (e) => {
    dispatch(forgetPasswordToggle())
  }

  if (user.isLoading) {
    return (
      <div>
        <h1 className='title'>Loading...</h1>
        <div className='loading'></div>
      </div>
    )
  }
  if (user.isMember) {
    return <Navigate to={'/dashboard'} />
  }
  return (
    <Wrapper>
      {user.forgetPassword ? (
        <ForgetPassword />
      ) : (
        <form className='form' onSubmit={handleSubmit}>
          {/* name input */}
          {!login && (
            <div>
              <label className='form-label' htmlFor='name'>
                Name
              </label>
              <input className='form-input' ref={nameRef} type='text' />
            </div>
          )}
          {/* email input */}
          <label className='form-label' htmlFor='email'>
            Email
          </label>
          <input className='form-input' ref={emailRef} type='text' />
          {/* name input */}
          <label className='form-label' htmlFor='password'>
            Password
          </label>
          <input className='form-input' ref={passwordRef} type='password' />
          <div className='login-register-forget'>
            {login ? (
              <button type='submit' className='btn'>
                LogIn
              </button>
            ) : (
              <button type='submit' className='btn'>
                Register
              </button>
            )}
            <button
              className='btn'
              type='button'
              onClick={handleForgetPassword}
            >
              Forget Password
            </button>
          </div>

          <p>
            {login ? 'You are not a member ?' : 'Are you a member ?'}
            <button
              className='login-button'
              onClick={handleLogin}
              type='button'
            >
              {login ? 'Register' : 'LogIn'}
            </button>
          </p>
        </form>
      )}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  min-height: calc(100vh - 3.2rem);
  form {
    margin-top: 6rem;
  }
  .login-button {
    background: var(--grey-3);
    border: transparent;
    font-size: large;
    border-bottom: 2px solid var(--primary-7);
    margin-left: 1rem;
    border-radius: var(--radius);

    padding: 5px;
    transition: var(--transition);

    :hover {
      cursor: pointer;
      background: var(--primary-5);
      color: white;
    }
  }

  .login-register-forget {
    display: flex;
    justify-content: space-between;
  }
`
export default Register
