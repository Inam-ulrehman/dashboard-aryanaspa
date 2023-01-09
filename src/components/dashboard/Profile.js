import moment from 'moment/moment'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { customFetch } from '../../utils/axios'
import FormInput from '../FormInput'

const initialState = {
  user: [],
  isLoading: false,
  name: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  province: '',
  postalCode: '',
  updatedAt: '',
  createdAt: '',
  verified: '',
}
const Profile = () => {
  const [state, setState] = useState(initialState)
  const { user } = useSelector((state) => state)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await customFetch.patch('/auth/changeprofile', state, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })

      toast.success(response.data.msg)
    } catch (error) {
      console.log(error.response)
    }
  }
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setState({ ...state, [name]: value })
  }

  // Get single User
  const getData = async () => {
    setState({ ...state, isLoading: true })
    try {
      const response = await customFetch.get('auth/profile', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      const data = response.data
      setState({ ...state, ...data, isLoading: false })
    } catch (error) {
      setState({ ...state, isLoading: false })
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line
  }, [])
  if (state.isLoading) {
    return (
      <div>
        <h1 className='title'>Loading...</h1>
        <div className='loading'></div>
      </div>
    )
  }
  return (
    <Wrapper>
      <div className='dates'>
        <p>
          Created At{' '}
          <strong>{moment(state.createdAt).format('MMM Do YY')}</strong>
        </p>
        <p>
          Last updated{' '}
          <strong>{moment(state.updatedAt).format('MMM Do YY')}</strong>
        </p>
      </div>
      <form className='form' onSubmit={handleSubmit}>
        {/* name input */}
        <FormInput
          label={'First Name'}
          name={'name'}
          value={state.name}
          onChange={handleChange}
        />
        {/* last name input */}
        <FormInput
          label={'Last Name'}
          name={'lastName'}
          value={state.lastName}
          onChange={handleChange}
        />
        {/* Email input */}
        <FormInput name={'email'} value={state.email} onChange={handleChange} />
        {/* phone input */}
        <FormInput
          type={'number'}
          name={'phone'}
          value={state.phone}
          onChange={handleChange}
        />
        {/* Address input */}
        <FormInput
          name={'address'}
          value={state.address}
          onChange={handleChange}
        />
        {/* City input */}
        <FormInput name={'city'} value={state.city} onChange={handleChange} />
        {/* province input */}
        <FormInput
          name={'province'}
          value={state.province}
          onChange={handleChange}
        />
        {/* postalCode input */}
        <FormInput
          label={'postal code'}
          name={'postalCode'}
          value={state.postalCode}
          onChange={handleChange}
        />

        <button type='submit' className='btn'>
          Update Profile
        </button>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .dates {
    display: flex;
    padding: 0 1rem;
    justify-content: space-between;
    p {
      margin: 0;
    }
  }
  @media (min-width: 600px) {
    form {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      min-width: 800px;
    }
  }
`

export default Profile
