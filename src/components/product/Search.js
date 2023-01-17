import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import {
  getStateValues,
  queryProducts,
} from '../../features/products/productSlice'
import { customFetch } from '../../utils/axios'

const Search = () => {
  const [feature, setFeature] = useState()
  const dispatch = useDispatch()
  const { product } = useSelector((state) => state)
  const titleRef = useRef()
  const categoryRef = useRef()
  const subCategoryRef = useRef()
  const _idRef = useRef()
  const sortRef = useRef()
  const title = titleRef?.current?.value
  const category = categoryRef?.current?.value
  const subCategory = subCategoryRef?.current?.value
  const _id = _idRef?.current?.value
  const sort = sortRef?.current?.value

  // =========handle Submit========
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('hello')
    try {
      const response = await customFetch.get(
        `/products?title=${title}&category=${category}&subCategory=${subCategory}&_id=${_id}&feature=${feature}&limit=${product.limit}&sort=${sort}&page=${product.page}`
      )

      dispatch(queryProducts(response.data))
    } catch (error) {
      console.log(error.response)
    }
  }
  // =========handle NextPage============
  const nextPage = async (e) => {
    try {
      const response = await customFetch.get(
        `/products?title=${title}&category=${category}&subCategory=${subCategory}&_id=${_id}&feature=${feature}&limit=${product.limit}&sort=${sort}&page=${product.page}`
      )

      dispatch(queryProducts(response.data))
    } catch (error) {
      console.log(error.response)
    }
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
  }, [product.page])
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
              <option value='createdAt'>DATE NEW</option>
              <option value='-createdAt'>DATE OLD</option>
              <option value='-amount'>PRICE HIGH</option>
              <option value='amount'>PRICE LOW</option>
              <option value='title'>NAME A-Z</option>
              <option value='-title'>NAME Z-A</option>
            </select>
          </div>
          <div className='feature'>
            <button
              type='button'
              className={feature ? 'btn' : ''}
              onClick={() => setFeature(true)}
            >
              Feature
            </button>
          </div>
        </div>
        {/* ============box divided */}
        <div className='search'>
          <input type='text' ref={titleRef} placeholder='Title' />
          <input type='text' ref={categoryRef} placeholder='Category' />
          <input type='text' ref={subCategoryRef} placeholder='SubCategory' />
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
