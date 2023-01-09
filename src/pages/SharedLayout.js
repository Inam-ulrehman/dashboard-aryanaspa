import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { ContactWarning } from '../components/contact'
import Footer from '../components/footer/Footer'
import DesktopNavbar from '../components/navbar/DesktopNavbar'
import OrderWarning from '../components/order/OrderWarning'
import ProductWarning from '../components/product/ProductWarning'
import Warning from '../components/Warning'

const SharedLayout = () => {
  const { warning, productWarning, contactWarning, orderWarning } = useSelector(
    (state) => state.function
  )
  return (
    <main>
      <DesktopNavbar />
      {warning && <Warning />}
      {productWarning && <ProductWarning />}
      {contactWarning && <ContactWarning />}
      {orderWarning && <OrderWarning />}
      <Wrapper>
        <Outlet />
      </Wrapper>
      <Footer />
    </main>
  )
}
const Wrapper = styled.section`
  margin-top: 3.2rem;
`
export default SharedLayout
