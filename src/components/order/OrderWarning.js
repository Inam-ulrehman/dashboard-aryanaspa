import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { hideOrderWarning } from '../../features/functions/functionSlice'
import { deleteSingleOrderThunk } from '../../features/order/orderSlice'

const OrderWarning = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { deleteId } = useSelector((state) => state.order)
  const handleYes = () => {
    dispatch(deleteSingleOrderThunk(deleteId))
    dispatch(hideOrderWarning())
    navigate('/dashboard/orders')
  }
  return (
    <Wrapper>
      <div className='background'></div>
      <div className='container'>
        <p>Do you really want to delete this Order?</p>
        <div className='button'>
          <button onClick={() => dispatch(hideOrderWarning())} className='btn'>
            No
          </button>
          <button onClick={handleYes} className='btn'>
            YES
          </button>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .background {
    position: fixed;
    background-color: var(--grey-8);
    height: 100vh;
    width: 100vw;
    opacity: 0.4;
    z-index: 1;
  }
  position: fixed;
  height: 100vh;
  display: grid;
  place-items: center;
  width: 100vw;
  .container {
    z-index: 2;
    background-color: var(--white);
    padding: 1rem;
  }
  .button {
    display: flex;
    justify-content: space-around;
  }
`
export default OrderWarning
