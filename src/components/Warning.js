import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { hideWarning } from '../features/functions/functionSlice'

const Warning = ({ action, id }) => {
  const dispatch = useDispatch()
  const handleYes = () => {
    dispatch(action)
  }
  return (
    <Wrapper>
      <div className='background'></div>
      <div className='container'>
        <p>This is your action are you sure ?</p>
        <div className='button'>
          <button onClick={() => dispatch(hideWarning())} className='btn'>
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
export default Warning
