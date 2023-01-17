import { React, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Search from '../../components/product/Search'
import ServerSidePagination from '../../components/product/ServerSidePagination'

import { showProductWarning } from '../../features/functions/functionSlice'
import {
  getProductDeleteId,
  getProductsThunk,
} from '../../features/products/productSlice'
import { formatPrice } from '../../utils/helper'

const Products = () => {
  const dispatch = useDispatch()
  const { product } = useSelector((state) => state)

  const { isLoading, productsList, nbHits, getProducts, page } = product

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
      <div className='span'>
        <span>
          Total Products: <strong>{nbHits}</strong>
        </span>
        <span>
          Page No: <strong>{page}</strong>
        </span>
      </div>
      {/* Search */}
      <Search />
      <table>
        <tbody>
          <tr>
            <th>PRODUCT IMAGE</th>
            <th>TITLE</th>
            <th>CATEGORY</th>
            <th>SUBCATEGORY</th>
            <th>AVAILABLE</th>
            <th>FEATURE</th>
            <th>PRICE</th>
            <th>ACTIONS</th>
          </tr>

          {productsList?.map((item) => {
            return (
              <tr key={item._id}>
                <td className='image-holder'>
                  <img src={item.uploadImage[0].secure_url} alt={item.title} />
                </td>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>{item.subCategory}</td>
                <td>{item.inStock ? 'Available' : 'out-of-Stock'}</td>
                <td>{item.feature ? 'Feature' : null}</td>
                <td>{formatPrice(item.amount)}</td>
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
      <ServerSidePagination />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  .span {
    display: flex;
    justify-content: space-between;
    margin: 0 2rem;
  }
  text-align: center;
  .image-holder {
    max-width: 150px;
  }
  img {
    width: 100px;
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
