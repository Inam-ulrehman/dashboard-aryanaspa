import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { DashboardTotalCard } from '../../components/cards'
import { getProductsThunk } from '../../features/products/productSlice'
import { getOrdersThunk } from '../../features/order/orderSlice'
import { getContactThunk } from '../../features/contact/contactSlice'
import { getUsersThunk } from '../../features/user/userSlice'
import ProductChart from '../../components/dashboard/ProductChart'
import { CountAllChart } from '../../components/dashboard'

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
      <div className='container'>
        <div className='total-card'>
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
            total={user?.nbHits}
            navigateLink={'/dashboard/users'}
          />
          {/* User Card */}
          {/* <DashboardTotalCard
            title={`Appointment`}
            total={appointment?.count}
            navigateLink={'/dashboard/appointment'}
          /> */}
        </div>
        <CountAllChart className='count-chart' />
      </div>
      <ProductChart />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .container {
    display: grid;
    grid-template-columns: 3fr 1fr;
    .recharts-wrapper {
      background-color: var(--white);
      box-shadow: var(--shadow-2);
    }
  }
  .total-card {
    display: flex;
  }
`
export default DashboardHome
