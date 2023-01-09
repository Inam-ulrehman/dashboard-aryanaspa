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
      <div className='product-container'>
        <div className='product-header'>
          <h3 className='title'>{title}</h3>
          <div className='title-underline'></div>
        </div>
        <div className='product-body'>
          <span>Total {title} : </span>
          <span>
            <strong> {total}</strong>
          </span>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .product-container {
    background: var(--white);
    color: var(--primary-9);
    width: 200px;
    height: 100px;
    box-shadow: var(--shadow-2);
    transition: var(--transition);
    :hover {
      box-shadow: var(--shadow-3);
      cursor: pointer;
    }
    .product-body {
      display: flex;
      justify-content: space-around;
      padding: 1rem;
    }
  }
`
export default DashboardTotalCard
