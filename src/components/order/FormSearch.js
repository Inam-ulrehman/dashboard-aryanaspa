import React from 'react'
import { FaSearch } from 'react-icons/fa'

const FormSearch = ({
  emailRef,
  handlePhone,
  phoneRef,
  handleEmail,
  handleOrderId,
  orderIdRef,
  handlePaymentIntent,
  paymentIntentRef,
}) => {
  return (
    <div className='form-container'>
      {/* phone search */}
      <form onClick={handlePhone} className='mobile'>
        <input placeholder='Phone No' type='number' ref={phoneRef} />
        <button className='btn' type='submit'>
          <FaSearch />
        </button>
      </form>
      {/* email Search */}
      <form onClick={handleEmail}>
        <input placeholder='Email' type='text' ref={emailRef} />
        <button className='btn' type='submit'>
          <FaSearch />
        </button>
      </form>
      {/* Order _id */}
      <form onClick={handleOrderId}>
        <input placeholder='Order Id' type='text' ref={orderIdRef} />
        <button className='btn' type='submit'>
          <FaSearch />
        </button>
      </form>
      {/* payment_Intent */}
      <form onClick={handlePaymentIntent}>
        <input placeholder='Stripe Id' type='text' ref={paymentIntentRef} />
        <button className='btn' type='submit'>
          <FaSearch />
        </button>
      </form>
    </div>
  )
}

export default FormSearch
