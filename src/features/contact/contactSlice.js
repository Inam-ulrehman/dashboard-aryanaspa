import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { customFetch } from '../../utils/axios'
import { getUserFromLocalStorage } from '../../utils/localStorage'
import paginate from '../../utils/paginate'

const initialState = {
  contactList: [],
  singleContact: [],
  count: '',
  deleteId: '',
  getContacts: false,
  isLoading: false,
}

export const contactThunk = createAsyncThunk(
  'contact/contactThunk',
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
// ==== GET CONTACT LIST====

export const getContactThunk = createAsyncThunk(
  'contact/getContactThunk',
  async (_, thunkAPI) => {
    const user = getUserFromLocalStorage()
    try {
      const response = await customFetch.get('contacts', {
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
// ==== GET Single CONTACT LIST====

export const getSingleContactThunk = createAsyncThunk(
  'contact/getSingleContactThunk',
  async (_id, thunkAPI) => {
    const user = getUserFromLocalStorage()
    try {
      const response = await customFetch.get(`contacts/${_id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      console.log(response)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// ==== Delete Single CONTACT LIST====

export const deleteSingleContactThunk = createAsyncThunk(
  'contact/deleteSingleContactThunk',
  async (_id, thunkAPI) => {
    const user = getUserFromLocalStorage()
    try {
      const response = await customFetch.delete(`contacts/${_id}`, {
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

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    createFunction: (state, { payload }) => {
      console.log('function call')
    },
    getContactDeleteId: (state, { payload }) => {
      state.deleteId = payload
    },
  },
  extraReducers: {
    [contactThunk.pending]: (state, { payload }) => {
      console.log('promise pending')
      state.isLoading = true
    },
    [contactThunk.fulfilled]: (state, { payload }) => {
      console.log('promise full filled')
      state.isLoading = false
    },
    [contactThunk.rejected]: (state, { payload }) => {
      console.log('promise rejected')
      state.isLoading = false
    },
    // === GET CONTACT LIST
    [getContactThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [getContactThunk.fulfilled]: (state, { payload }) => {
      const { contacts, count } = payload
      state.contactList = paginate(contacts)
      state.count = count
      state.isLoading = false
    },
    [getContactThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
    // === GET Single CONTACT LIST
    [getSingleContactThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [getSingleContactThunk.fulfilled]: (state, { payload }) => {
      state.singleContact = payload.contacts
      state.isLoading = false
    },
    [getSingleContactThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
    // === Delete Single CONTACT LIST
    [deleteSingleContactThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [deleteSingleContactThunk.fulfilled]: (state, { payload }) => {
      toast.success('Form deleted.')
      state.getContacts = !state.getContacts
      state.isLoading = false
    },
    [deleteSingleContactThunk.rejected]: (state, { payload }) => {
      toast.error(`${payload?.msg ? payload.msg : payload}`)
      state.isLoading = false
    },
  },
})
export const { createFunction, getContactDeleteId } = contactSlice.actions
export default contactSlice.reducer
