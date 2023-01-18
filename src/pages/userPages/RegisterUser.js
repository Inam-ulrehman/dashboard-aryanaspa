import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import FormInput from '../../components/FormInput'
import { customFetch } from '../../utils/axios'
import { getUserFromLocalStorage } from '../../utils/localStorage'

const initialState = {
  name: '',
  lastName: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  province: '',
  postalCode: '',
  isLoading: false,
}
const RegisterUser = () => {
  const [state, setState] = useState(initialState)
  // handle Submit ===
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!state.name || !state.email) {
      toast.error('Please Provide Name and Email.')
    }
    const { token } = getUserFromLocalStorage()
    setState({ ...state, isLoading: true })
    try {
      const result = await customFetch.post('/auth/users', state, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setState({ ...state, isLoading: false })
      toast.success(result.statusText)
    } catch (error) {
      setState({ ...state, isLoading: false })
      toast.error(error.response.data.msg)
      console.log(error.response)
    }
  }

  // handle change
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setState({ ...state, [name]: value })
  }
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
      <h3 className='title'>Register New User Form</h3>
      <form className='form' onSubmit={handleSubmit}>
        <div className='box-1'>
          {/* name input */}
          <FormInput name='name' value={state.name} onChange={handleChange} />
          {/* lastName input */}
          <FormInput
            name='lastName'
            label='Last Name'
            value={state.lastName}
            onChange={handleChange}
          />
          {/* phone input */}
          <FormInput
            name='phone'
            type='number'
            value={state.phone}
            onChange={handleChange}
          />
          {/* email input */}
          <FormInput name='email' value={state.email} onChange={handleChange} />
        </div>
        {/* ====================Box Divider=============*/}
        <div className='box-2'>
          {/* addaddress input */}
          <FormInput
            name='address'
            value={state.address}
            onChange={handleChange}
          />
          {/* city input */}
          <FormInput name='city' value={state.city} onChange={handleChange} />
          {/* province input */}
          <FormInput
            name='province'
            value={state.province}
            onChange={handleChange}
          />
          {/* postalCode  input */}
          <FormInput
            name='postalCode'
            label='Postal Code'
            value={state.postalCode}
            onChange={handleChange}
          />
          <button className='btn' type='submit'>
            Submit
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  form {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
    max-width: 80vw;
  }
`
export default RegisterUser
