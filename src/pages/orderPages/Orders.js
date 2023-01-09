import React from 'react'
import styled from 'styled-components'
import OrderList from '../../components/order/OrderList'
import Search from '../../components/order/Search'
import ServerPagination from '../../components/order/ServerPagination'

const Orders = () => {
  return (
    <Wrapper>
      <Search />
      <OrderList />
      <ServerPagination />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .buttons {
    width: 180px;
    a {
      padding: 1px 10px;
    }
    a,
    button {
      margin: 5px;
    }
  }
  .date {
    width: 130px;
  }
  .image {
    width: 70px;
    img {
      width: 100%;
    }
  }
  td {
    text-align: center;
  }
  .name {
    div {
      padding: 1rem;
    }
  }
  .quantity {
    div {
      padding: 1rem;
    }
  }
`
export default Orders
