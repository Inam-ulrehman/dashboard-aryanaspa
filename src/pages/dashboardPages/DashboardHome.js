import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { DashboardTotalCard } from '../../components/cards'
import { getProductsThunk } from '../../features/products/productSlice'
import { getOrdersThunk } from '../../features/order/orderSlice'
import { getContactThunk } from '../../features/contact/contactSlice'
import { getUsersThunk } from '../../features/user/userSlice'
import ProductChart from '../../components/dashboard/ProductChart'

const DashboardHome = () => {
  const { product, order, contact, user } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProductsThunk())
    dispatch(getOrdersThunk(order))
    dispatch(getContactThunk())
    dispatch(getUsersThunk())
    // eslint-disable-next-line
  }, [])
  return (
    <Wrapper>
      <div className='card-holder'>
        {/* Product Card */}
        <DashboardTotalCard
          title={`Products`}
          total={product.nbHits}
          navigateLink={'/dashboard/products'}
        />
        {/* Order Card */}
        <DashboardTotalCard
          title={`Orders`}
          total={order.totalOrders}
          navigateLink={'/dashboard/orders'}
        />
        {/* Contact Card */}
        <DashboardTotalCard
          title={`Contacts`}
          total={contact.count}
          navigateLink={'/dashboard/Contact'}
        />
        {/* User Card */}
        <DashboardTotalCard
          title={`Users`}
          total={user.nbHits}
          navigateLink={'/dashboard/users'}
        />
      </div>
      <ProductChart />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .card-holder {
    display: flex;
    flex-wrap: wrap;
    padding: 1rem;
    gap: 1rem;
  }
`
export default DashboardHome
