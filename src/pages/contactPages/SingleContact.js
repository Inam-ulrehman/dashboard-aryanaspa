import moment from 'moment/moment'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import {
  getContactDeleteId,
  getSingleContactThunk,
} from '../../features/contact/contactSlice'
import { showContactWarning } from '../../features/functions/functionSlice'

const SingleContact = () => {
  const dispatch = useDispatch()
  const { _id } = useParams()
  const { singleContact, isLoading } = useSelector((state) => state.contact)

  // handleDelete

  const handleDelete = () => {
    dispatch(showContactWarning())
    dispatch(getContactDeleteId(_id))
  }
  useEffect(() => {
    dispatch(getSingleContactThunk(_id))
    // eslint-disable-next-line
  }, [])
  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
        <div className='loading'></div>
      </div>
    )
  }
  return (
    <Wrapper>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Created At</th>
          </tr>

          <tr>
            <td>{singleContact.name}</td>
            <td>{singleContact.subject}</td>
            <td>{singleContact.email}</td>
            <td>{singleContact.mobile}</td>
            <td>{moment(singleContact.createdAt).format('MMM Do YY')}</td>
          </tr>
        </tbody>
      </table>
      <div className='message'>
        <h3 className='title'>Message</h3>
        <p>{singleContact.message}</p>
      </div>
      <div className='buttons'>
        <Link to={`/dashboard/contact`} className='btn'>
          GoBack
        </Link>
        <button onClick={handleDelete} type='button' className='btn'>
          Delete
        </button>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  table {
  }
  .message {
    background-color: var(--white);
    max-width: 70vw;
    box-shadow: var(--shadow-2);
    margin: 1rem auto;
    padding: 1rem;

    p {
      max-width: 100%;
    }
  }
  tr {
    text-align: center;
    td {
      text-transform: capitalize;
    }
  }

  .buttons {
    text-align: center;
    a {
      padding: 1px 10px;
      margin-right: 1rem;
    }
  }
`
export default SingleContact
