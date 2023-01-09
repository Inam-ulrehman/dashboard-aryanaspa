import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { customFetch } from '../../utils/axios'
import { getUserFromLocalStorage } from '../../utils/localStorage'

const initialState = {
  phone: '',
  email: '',
  payment_intent: '',
  _id: '',
  sort: '-createdAt',
  limit: 10,
  page: 1,
  orderList: [],
  totalOrders: '',
  getOrders: '',
  deleteId: '',
  isLoading: false,
}

export const orderThunk = createAsyncThunk(
  'order/orderThunk',
  async (_, thunkAPI) => {
    try {
      const response = await customFetch.get()
      console.log('hello Thunk')
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// Get All Orders
export const getOrdersThunk = createAsyncThunk(
  'order/getOrdersThunk',
  async (query, thunkAPI) => {
    const user = getUserFromLocalStorage()
    try {
      const response = await customFetch.get(
        `/admin/orders?phone=${query?.phone}&email=${query?.email}&_id=${query?._id}&payment_intent=${query?.payment_intent}&sort=${query?.sort}&page=${query?.page}&limit=${query.limit}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )

      return response.data
    } catch (error) {
      console.log(error.response)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// ==== Delete Single Order====

export const deleteSingleOrderThunk = createAsyncThunk(
  'order/deleteSingleOrderThunk',
  async (_id, thunkAPI) => {
    const user = getUserFromLocalStorage()

    try {
      const response = await customFetch.delete(`admin/orders/${_id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createFunction: (state, { payload }) => {
      console.log('function call')
    },
    nextOrder: (state, { payload }) => {
      state.page = state.page + 1
    },
    prevOrder: (state, { payload }) => {
      state.page = state.page - 1
    },
    indexOrder: (state, { payload }) => {
      state.page = payload
    },
    searchOrderByPhone: (state, { payload }) => {
      state.phone = payload
      state.page = 1
    },
    searchOrderByEmail: (state, { payload }) => {
      state.email = payload
      state.page = 1
    },
    searchOrderById: (state, { payload }) => {
      state._id = payload
      state.page = 1
    },
    searchOrderByPaymentIntent: (state, { payload }) => {
      state.payment_intent = payload
      state.page = 1
    },
    clearOrderSearch: (state, { payload }) => {
      state.phone = ''
      state.email = ''
      state._id = ''
      state.sort = '-createdAt'
      state.payment_intent = ''
      state.page = 1
      state.limit = 10
    },
    sortOrder: (state, { payload }) => {
      state.sort = payload
      state.page = 1
    },
    limitOrder: (state, { payload }) => {
      state.limit = payload
      state.page = 1
    },
    deleteIdOrder: (state, { payload }) => {
      state.deleteId = payload
    },
  },
  extraReducers: {
    [orderThunk.pending]: (state, { payload }) => {
      console.log('promise pending')
      state.isLoading = true
    },
    [orderThunk.fulfilled]: (state, { payload }) => {
      console.log('promise full filled')
      state.isLoading = false
    },
    [orderThunk.rejected]: (state, { payload }) => {
      console.log('promise rejected')
      state.isLoading = false
    },
    // Get All Orders
    [getOrdersThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [getOrdersThunk.fulfilled]: (state, { payload }) => {
      state.orderList = payload.result
      state.totalOrders = payload.totalOrders
      state.isLoading = false
    },
    [getOrdersThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
    // === Delete Single Order
    [deleteSingleOrderThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [deleteSingleOrderThunk.fulfilled]: (state, { payload }) => {
      toast.success('Order deleted.')
      state.getOrders = !state.getOrders
      state.isLoading = false
    },
    [deleteSingleOrderThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
  },
})
export const {
  createFunction,
  nextOrder,
  prevOrder,
  indexOrder,
  searchOrderByPhone,
  searchOrderByEmail,
  searchOrderById,
  searchOrderByPaymentIntent,
  clearOrderSearch,
  sortOrder,
  limitOrder,
  deleteIdOrder,
} = orderSlice.actions
export default orderSlice.reducer
