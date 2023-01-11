import React from 'react'
import { useSelector } from 'react-redux'

const AmountHolder = ({ handleChange }) => {
  const { product } = useSelector((state) => state)
  return (
    <div className='amount-container'>
      {/* amountOne */}
      <div className='amountOne container'>
        <div className='box-1 text'>
          <label className='form-label' htmlFor='amountOneText'>
            Amount Title
          </label>
          <input
            className='form-input'
            type='text'
            name='amountOneText'
            value={product.amountOneText}
            onChange={handleChange}
          />
        </div>
        <div className='box-2 amount'>
          <label className='form-label' htmlFor='amountOne'>
            Amount
          </label>
          <input
            className='form-input'
            type='number'
            name='amountOne'
            value={product.amountOne}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* amountTwo */}
      <div className='amountTwo container'>
        <div className='box-1 text'>
          <label className='form-label' htmlFor='amountTwoText'>
            Amount Title
          </label>
          <input
            className='form-input'
            type='text'
            name='amountTwoText'
            value={product.amountTwoText}
            onChange={handleChange}
          />
        </div>
        <div className='box-2 amount'>
          <label className='form-label' htmlFor='amountTwo'>
            Amount
          </label>
          <input
            className='form-input'
            type='number'
            name='amountTwo'
            value={product.amountTwo}
            onChange={handleChange}
          />
        </div>
      </div>
      {/* amountThree */}
      <div className='amountThree container'>
        <div className='box-1 text'>
          <label className='form-label' htmlFor='amountThreeText'>
            Amount Title
          </label>
          <input
            className='form-input'
            type='text'
            name='amountThreeText'
            value={product.amountThreeText}
            onChange={handleChange}
          />
        </div>
        <div className='box-2 amount'>
          <label className='form-label' htmlFor='amountThree'>
            Amount Title
          </label>
          <input
            className='form-input'
            type='number'
            name='amountThree'
            value={product.amountThree}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  )
}

export default AmountHolder
