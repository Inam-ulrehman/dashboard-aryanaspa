import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUsersThunk } from '../../features/user/userSlice'
import { formatDate } from '../../utils/helper'

const UserList = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state)

  useEffect(() => {
    dispatch(getUsersThunk())
    // eslint-disable-next-line
  }, [])
  if (user.isLoading) {
    return (
      <div>
        <h1 className='title'>Loading...</h1>
        <div className='loading'></div>
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>First Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Postal Code</th>
            <th>Member Since</th>
            <th>Action</th>
          </tr>

          {user.userList.map((item, index) => {
            return (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td>{item.postalCode}</td>
                <td>{formatDate(item.createdAt)}</td>
                <td>
                  <Link className='btn' to={item._id}>
                    More Details
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
