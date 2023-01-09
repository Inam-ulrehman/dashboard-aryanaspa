import moment from 'moment/moment'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Pagination } from '../../components'
import {
  getContactDeleteId,
  getContactThunk,
} from '../../features/contact/contactSlice'
import { showContactWarning } from '../../features/functions/functionSlice'

const Contact = () => {
  const dispatch = useDispatch()
  const { contactList, count, isLoading, getContacts } = useSelector(
    (state) => state.contact
  )

  const [index, setIndex] = useState(0)
  //=== handle Delete button

  const handleDelete = (_id) => {
    dispatch(showContactWarning())
    dispatch(getContactDeleteId(_id))
  }

  useEffect(() => {
    dispatch(getContactThunk())
    // eslint-disable-next-line
  }, [getContacts])
  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
        <div className='div'></div>
      </div>
    )
  }
  return (
    <Wrapper>
      <h4>
        <strong>Total forms: {count}</strong>
        <strong>Page No: {index + 1}</strong>
      </h4>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>

          {contactList[index]?.map((item, itemIndex) => {
            return (
              <tr className='tr' key={itemIndex}>
                <td>{item.name}</td>
                <td>{item.subject}</td>
                <td>{moment(item.createdAt).format('MMM Do YY')}</td>
                <td className='buttons'>
                  <Link className='btn' to={`${item._id}`}>
                    Read
                  </Link>
                  <button
                    className='btn'
                    onClick={() => handleDelete(item._id)}
                    type='button'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Pagination
        index={index}
        setIndex={setIndex}
        productsList={contactList}
      />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  h4 {
    display: flex;
    justify-content: space-between;
  }
  .buttons {
    width: 160px;
    a {
      margin: 5px;
      padding: 1px 9px;
    }
  }

  .tr {
    text-align: center;
    td {
      text-transform: capitalize;
    }
  }
`
export default Contact
