import { React, useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Pagination } from '../../components'

import { showProductWarning } from '../../features/functions/functionSlice'
import {
  getProductDeleteId,
  getProductsThunk,
} from '../../features/products/productSlice'

const Products = () => {
  const dispatch = useDispatch()
  const { product } = useSelector((state) => state)
  const [index, setIndex] = useState(0)
  const { isLoading, productsList, nbHits, getProducts } = product

  const handleDelete = (_id) => {
    dispatch(showProductWarning())
    dispatch(getProductDeleteId(_id))
  }

  useEffect(() => {
    dispatch(getProductsThunk())
    // eslint-disable-next-line
  }, [getProducts])
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
      <Helmet>
        <title>Product</title>
        <meta name='description' content='Welcome to our Product Page.' />
        <link rel='canonical' href='/product' />
      </Helmet>
      <h4>
        <strong>Total Products: {nbHits}</strong>{' '}
        <strong>Page No: {index + 1}</strong>
      </h4>
      <table>
        <tbody>
          <tr>
            <th>PRODUCT IMAGE</th>
            <th>TITLE</th>
            <th>CATEGORY</th>
            <th>AVAILABLE</th>
            <th>Feature</th>
            <th>ACTIONS</th>
          </tr>

          {productsList[index]?.map((item) => {
            return (
              <tr key={item._id}>
                <td className='image-holder'>
                  <img src={item.uploadImage[0].secure_url} alt={item.title} />
                </td>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>{item.inStock ? 'In-Stock' : 'out-of-Stock'}</td>
                <td>{item.feature ? 'Feature Product' : ''}</td>
                <td className='buttons'>
                  <Link className='btn' to={item._id}>
                    Edit
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
      {/* Pagination buttons */}
      <Pagination
        index={index}
        setIndex={setIndex}
        productsList={productsList}
      />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  text-align: center;
  .image-holder {
    max-width: 150px;
  }
  img {
    width: 100px;
  }
  h4 {
    display: flex;
    justify-content: space-between;
  }
  td {
    text-transform: capitalize;
  }
  .buttons {
    width: 160px;
    a {
      padding: 1px 10px;
      margin-right: 5px;
    }
  }
`
export default Products
