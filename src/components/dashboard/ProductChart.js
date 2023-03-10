import React, { useEffect, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { customFetch } from '../../utils/axios'

const initialState = {
  data: [],
}
const ProductChart = () => {
  const [state, setState] = useState(initialState)

  let width = window.screen.width - 250

  const getData = async () => {
    const result = await customFetch('/products/static')
    const products = result.data.products
    // get Categories
    const categories = [...new Set(products.map((item) => item.category))]
    //  map Categories
    const totalStock = categories.map((item) => {
      // Categories match Products
      const categoriesResult = products.filter((items) => {
        return items.category === item
      })
      // All Item stock
      const stockArray = categoriesResult.map((item) => item.totalStock)
      // Total counted item
      const totalItemsCount = categoriesResult.map((item) => item.category)

      // Add Stock
      const total = stockArray.reduce((acc, value) => {
        const count = acc + value
        return count
      }, 0)
      // Convert in data
      const finalResult = {
        category: item,
        TotalStock: total,
        TotalItems: totalItemsCount.length,
      }

      return finalResult
    })

    setState({ ...state, data: totalStock })
  }
  useEffect(() => {
    getData()
    // eslint-disable-next-line
  }, [])
  return (
    <div>
      <BarChart width={width} height={250} data={state.data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='category' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='TotalStock' fill='var(--primary-5)' />
        <Bar dataKey='TotalItems' fill='var(--primary-8)' />
      </BarChart>
    </div>
  )
}

export default ProductChart
