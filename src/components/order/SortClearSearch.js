import React from 'react'

const SortClearSearch = ({
  handleSort,
  sortRef,
  handleLimit,
  limitRef,
  handleClear,
}) => {
  return (
    <div className='clear-sort'>
      {/* handle sort and limit */}
      <div className='sort-limit'>
        <label htmlFor='sort'>
          <strong>Sort By</strong>
        </label>
        <select onChange={handleSort} ref={sortRef} name='sort' id='sort'>
          <option value='-createdAt'>New Orders</option>
          <option value='createdAt'>Old Orders</option>
        </select>
        <label htmlFor='limit'>
          <strong>Limit Per Page</strong>
        </label>
        <select onChange={handleLimit} ref={limitRef} name='limit' id='limit'>
          <option value='10'>10</option>
          <option value='20'>20</option>
          <option value='30'>30</option>
          <option value='40'>40</option>
        </select>
      </div>
      <button className='btn' type='button' onClick={handleClear}>
        Clear Filters
      </button>
    </div>
  )
}

export default SortClearSearch
