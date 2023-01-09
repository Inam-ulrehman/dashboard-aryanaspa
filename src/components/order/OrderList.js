import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment/moment'
import { formatPrice } from '../../utils/helper'
import { useDispatch, useSelector } from 'react-redux'
import { deleteIdOrder, getOrdersThunk } from '../../features/order/orderSlice'
import { showOrderWarning } from '../../features/functions/functionSlice'
const OrderList = () => {
  const dispatch = useDispatch()
  const { orderList, isLoading } = useSelector((state) => state.order)
  const { order } = useSelector((state) => state)
  const { page, phone, email, _id, sort, limit, getOrders, payment_intent } =
    order

  // handleDelete

  const handleDelete = (_id) => {
    dispatch(deleteIdOrder(_id))
    dispatch(showOrderWarning())
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    dispatch(getOrdersThunk(order))
    // eslint-disable-next-line
  }, [page, phone, email, _id, sort, limit, getOrders, payment_intent])
  if (isLoading)
    return (
      <div>
        <h1 className='title'>Loading...</h1>
        <div className='loading'></div>
      </div>
    )
  return (
    <div className='container'>
      <table>
        <tbody>
          <tr>
            <th>IMAGE</th>
            <th>NAME</th>
            <th>QUANTITY</th>
            <th>PAYMENT</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>ACTION</th>
          </tr>
          {orderList?.map((item) => {
            const { cart } = item
            // grab names
            const name = cart.map((item, index) => (
              <div key={index}>{item.title}</div>
            ))
            // grab image
            const image = cart.map((item) => item.uploadImage[0].secure_url)

            // grab quantity
            const quantity = cart.map((item, index) => (
              <div key={index}>{item.quantity}</div>
            ))
            return (
              <tr key={item._id}>
                <td className='image'>
                  {image.map((item, index) => (
                    <img key={index} src={item} alt='' />
                  ))}
                  {/* <img src='' alt={item.title} /> */}
                </td>
                <td className='name'>{name}</td>
                <td className='quantity'>{quantity}</td>
                <td>{item.redirect_status}</td>
                <td className='date'>
                  {moment(item.createdAt).format('MMM Do YYYY')}
                </td>
                <td>{formatPrice(item.total)}</td>
                <td className='buttons'>
                  <Link to={item._id} type='button' className='btn'>
                    Select
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    type='button'
                    className='btn'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default OrderList
