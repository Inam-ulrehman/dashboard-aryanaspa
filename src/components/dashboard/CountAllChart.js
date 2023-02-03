import React from 'react'
import { useSelector } from 'react-redux'
import { Pie, PieChart, Tooltip } from 'recharts'

const CountAllChart = () => {
  const { product, order, contact, user } = useSelector((state) => state)

  const data01 = [
    {
      name: 'Products',
      value: product.nbHits,
    },
  ]
  const data02 = [
    {
      name: 'users',
      value: user.nbHits,
    },
    {
      name: 'Orders',
      value: order.totalOrders,
    },
    {
      name: 'Orders',
      value: contact.count,
    },
  ]

  return (
    <>
      <PieChart width={260} height={230}>
        <Tooltip />
        <Pie
          data={data01}
          dataKey='value'
          nameKey='name'
          cx='50%'
          cy='50%'
          outerRadius={50}
          fill='var(--primary-8)'
        />
        <Pie
          data={data02}
          dataKey='value'
          nameKey='name'
          cx='50%'
          cy='50%'
          innerRadius={60}
          outerRadius={80}
          fill='var(--primary-5)'
          label
        />
      </PieChart>
    </>
  )
}

export default CountAllChart
