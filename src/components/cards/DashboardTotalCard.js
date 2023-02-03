import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
const DashboardTotalCard = ({ total, navigateLink, title }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(navigateLink)
  }
  return (
    <Wrapper onClick={handleClick} className='container'>
      <div className='box-1'>
        <span>Total {title}: </span>
        <span>
          <strong> {total}</strong>
        </span>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 5px;
  box-shadow: var(--shadow-2);
  margin-right: 5px;
  background-color: var(--white);
  height: fit-content;
  transition: var(--transition);
  :hover {
    cursor: pointer;
    box-shadow: var(--shadow-3);
  }
`
export default DashboardTotalCard
