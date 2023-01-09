import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { deleteSingleContactThunk } from '../../features/contact/contactSlice'
import { hideContactWarning } from '../../features/functions/functionSlice'

const ContactWarning = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { deleteId } = useSelector((state) => state.contact)
  const handleYes = () => {
    dispatch(deleteSingleContactThunk(deleteId))
    dispatch(hideContactWarning())
    navigate('/dashboard/contact')
  }
  return (
    <Wrapper>
      <div className='background'></div>
      <div className='container'>
        <p>Do you really want to delete ?</p>
        <div className='button'>
          <button
            onClick={() => dispatch(hideContactWarning())}
            className='btn'
          >
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
export default ContactWarning
