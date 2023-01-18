import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import FormInput from '../../components/FormInput'
import { CreateUserNotes, HoldUserNotes } from '../../components/user'
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
  refreshData: false,
}

const SingleUser = () => {
  const [state, setState] = useState(initialState)
  const { _id } = useParams()

  // handle Submit ===
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!state.name || !state.email) {
      toast.error('Please Provide Name and Email.')
    }
    const { token } = getUserFromLocalStorage()
    setState({ ...state, isLoading: true })
    try {
      const result = await customFetch.post(`/auth/users/${_id}`, state, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setState({ ...state, isLoading: false })
      toast.success(result.statusText)
    } catch (error) {
      setState({ ...state, isLoading: false })
      toast.error(error.response.data.msg)
    }
  }

  // handle change
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setState({ ...state, [name]: value })
  }

  // fetch Data=====
  const fetchSingleUser = async () => {
    const { token } = getUserFromLocalStorage()
    setState({ ...state, isLoading: true })
    try {
      const result = await customFetch(`/auth/users/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (result.data.phone === null) {
        delete result.data.phone
      }
      setState({ ...state, isLoading: false, ...result.data })
    } catch (error) {
      setState({ ...state, isLoading: false })
      console.log(error.response)
    }
  }

  const cbFunction = () => {
    setState({ ...state, refreshData: !state.refreshData })
  }
  // use Effect=
  useEffect(() => {
    fetchSingleUser()
    // eslint-disable-next-line
  }, [state.refreshData])

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
      <div className='single-user'>
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
            <FormInput
              name='email'
              value={state.email}
              onChange={handleChange}
            />
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
              Update User
            </button>
          </div>
        </form>
      </div>
      <hr />
      <CreateUserNotes cbFunction={cbFunction} />
      <hr />
      <HoldUserNotes notes={state.notes} />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .single-user {
    form {
      display: grid;
      gap: 1rem;
      grid-template-columns: 1fr 1fr;
      max-width: 80vw;
    }
  }
`
export default SingleUser
