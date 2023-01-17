import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import {
  indexOrder,
  nextOrder,
  prevOrder,
} from '../../features/products/productSlice'

const ServerPagination = () => {
  const dispatch = useDispatch()
  const {
    page,
    nbHits: totalOrders,
    limit,
  } = useSelector((state) => state.product)

  const totalPages = Math.ceil(totalOrders / limit)
  const pages = Array.from({ length: totalPages }, (v, i) => i + 1)

  // handle buttons

  const handleNext = (e) => {
    if (pages.length <= page) {
      return
    }
    dispatch(nextOrder())
  }

  const handleIndex = (e) => {
    dispatch(indexOrder(e.target.value))
  }

  const handlePrev = (e) => {
    dispatch(prevOrder())
  }
  return (
    <Wrapper className='title'>
      <button className='btn' type='button' onClick={handlePrev}>
        Prev
      </button>
      {pages.map((item, index) => {
        return (
          <button
            key={index}
            className={Number(page) === index + 1 ? `btn active` : 'btn'}
            type='button'
            onClick={handleIndex}
            value={item}
          >
            {item}
          </button>
        )
      })}
      <button className='btn' type='button' onClick={handleNext}>
        Next
      </button>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .active {
    background-color: var(--primary-8);
  }
`
export default ServerPagination
