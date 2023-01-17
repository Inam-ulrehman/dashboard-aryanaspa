import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Pagination from '../../components/user/Pagination'
import Search from '../../components/user/Search'
import UserList from '../../components/user/UserList'

const Users = () => {
  const { nbHits, page } = useSelector((state) => state.user)
  return (
    <Wrapper>
      <div className='container-heading'>
        <Link className='btn' to={'register'}>
          Register New User
        </Link>

        <span>
          Total Users:
          <strong>{nbHits}</strong>
        </span>
        <span>
          Page No:<strong>{page}</strong>
        </span>
      </div>
      <Search />
      <UserList />
      <Pagination />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .container-heading {
    display: flex;
    justify-content: space-between;
    span {
      padding: 0 2rem;
    }
  }
`
export default Users
