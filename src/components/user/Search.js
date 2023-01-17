import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getStateValues, queryProducts } from '../../features/user/userSlice'
import { customFetch } from '../../utils/axios'
import { getUserFromLocalStorage } from '../../utils/localStorage'

const Search = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state)
  const nameRef = useRef()
  const phoneRef = useRef()
  const emailRef = useRef()
  const addressRef = useRef()
  const postalCodeRef = useRef()
  const _idRef = useRef()
  const sortRef = useRef()

  // =========handle Submit========
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { token } = getUserFromLocalStorage()

    try {
      const response = await customFetch.get(
        `/auth/users?name=${nameRef?.current?.value}&phone=${phoneRef?.current?.value}&email=${emailRef?.current?.value}&postalCode=${postalCodeRef?.current?.value}&address=${addressRef?.current?.value}&_id=${_idRef?.current?.value}&limit=${user.limit}&sort=${sortRef?.current?.value}&page=${user.page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      dispatch(queryProducts(response.data))
    } catch (error) {
      console.log(error.response)
    }
  }
  // =========handle NextPage============
  const nextPage = async (e) => {
    const { token } = getUserFromLocalStorage()
    try {
      const response = await customFetch.get(
        `/auth/users?name=${nameRef?.current?.value}&phone=${phoneRef?.current?.value}&email=${emailRef?.current?.value}&postalCode=${postalCodeRef?.current?.value}&address=${addressRef?.current?.value}&_id=${_idRef?.current?.value}&limit=${user.limit}&sort=${sortRef?.current?.value}&page=${user.page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      dispatch(queryProducts(response.data))
    } catch (error) {}
  }

  const handleClear = () => {
    window.location.reload()
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    dispatch(getStateValues({ name, value }))
  }

  useEffect(() => {
    nextPage()
    window.scrollTo({ top: 0, left: 0 })
    // eslint-disable-next-line
  }, [user.page])
  return (
    <Wrapper className='container'>
      <button className='btn clear-filter' type='button' onClick={handleClear}>
        Clear Filter
      </button>
      <form onSubmit={handleSubmit}>
        <div className='limit-sort'>
          <div className='limit'>
            <label htmlFor='limit'>Limit</label>
            <select name='limit' id='limit' onChange={handleChange}>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
            </select>
          </div>
          <div className='sort'>
            <label htmlFor='sort'>Sort</label>
            <select name='sort' id='sort' ref={sortRef}>
              <option value='createdAt'>SELECT OPTIONS</option>
              <option value='createdAt'>DATE NEW</option>
              <option value='-createdAt'>DATE OLD</option>
              <option value='title'>NAME A-Z</option>
              <option value='-title'>NAME Z-A</option>
            </select>
          </div>
        </div>
        {/* ============box divided */}
        <div className='search'>
          <input type='text' ref={nameRef} placeholder='First Name' />
          <input type='number' ref={phoneRef} placeholder='Phone Number' />
          <input type='text' ref={emailRef} placeholder='Email' />
          <input type='text' ref={addressRef} placeholder='Address' />
          <input type='text' ref={postalCodeRef} placeholder='Postal Code' />
          <input type='text' ref={_idRef} placeholder='id' />
          <button className='btn' type='submit'>
            Search
          </button>
        </div>
      </form>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  position: relative;
  .clear-filter {
    position: absolute;
    top: 0;
    right: 5%;
  }
  .limit-sort {
    display: flex;
    margin-bottom: 5px;
    gap: 1rem;
  }
  .sort,
  .limit {
    select {
      :hover {
        cursor: pointer;
      }
    }
  }

  button {
    border: transparent;

    box-shadow: var(--shadow-1);
    padding: 4px;
    transition: var(--transition);
    :hover {
      cursor: pointer;
      background-color: var(--primary-5);
      color: var(--white);
    }
  }
`
export default Search
