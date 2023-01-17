import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { customFetch } from '../../utils/axios'
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
  setUserInLocalStorage,
} from '../../utils/localStorage'
import { toast } from 'react-toastify'

const user = getUserFromLocalStorage()
const initialState = {
  token: user?.token || '',
  userName: user?.user?.name || '',
  isMember: user?.isAdmin ? true : false,
  isLoading: false,
  forgetPassword: false,
  userList: [],
  nbHits: '',
  page: 1,
  limit: 10,
}

export const userThunk = createAsyncThunk(
  'user/userThunk',
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
// Register a user
export const registerUserThunk = createAsyncThunk(
  'user/registerUserThunk',
  async (user, thunkAPI) => {
    try {
      const response = await customFetch.post('/auth/register', user)

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// verify a user
export const verifyUserThunk = createAsyncThunk(
  'user/verifyUserThunk',
  async (id, thunkAPI) => {
    try {
      const response = await customFetch.get(`/auth/verify/${id}`)

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// Login a user
export const loginUserThunk = createAsyncThunk(
  'user/loginUserThunk',
  async (user, thunkAPI) => {
    try {
      const response = await customFetch.post('/auth/login', user)
      const token = response.data.token
      const isAdmin = await customFetch.post(
        '/auth/verifyAdmin',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      response.data.isAdmin = isAdmin.data.msg

      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// Forget Password Link
export const forgetPasswordLinkThunk = createAsyncThunk(
  'user/forgetPasswordLinkThunk',
  async (user, thunkAPI) => {
    try {
      const response = await customFetch.post('/auth/forgetPassword', user)

      return response.data.msg
    } catch (error) {
      console.log(error.response)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// Forget Password change
export const forgetPasswordChangeThunk = createAsyncThunk(
  'user/forgetPasswordChangeThunk',
  async (user, thunkAPI) => {
    const { id, password } = user
    try {
      const response = await customFetch.post(`/auth/forgetPassword/${id}`, {
        password,
      })

      return response.data.msg
    } catch (error) {
      console.log(error.response)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)
// change password
export const changePasswordThunk = createAsyncThunk(
  'user/changePasswordThunk',
  async (password, thunkAPI) => {
    const user = getUserFromLocalStorage()
    try {
      const response = await customFetch.post(
        `/auth/changePassword`,
        password,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )

      return response.data.msg
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

// ========= Get users ========
export const getUsersThunk = createAsyncThunk(
  'user/getUsersThunk',
  async (query, thunkAPI) => {
    const user = getUserFromLocalStorage()
    try {
      const response = await customFetch.get('auth/users', {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })

      return response.data
    } catch (error) {
      console.log(error.response)
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createFunction: (state, { payload }) => {
      console.log('function call')
    },
    logOut: (state, { payload }) => {
      removeUserFromLocalStorage('user')
      state.isMember = false
      toast.success('See you soon.')
    },
    forgetPasswordToggle: (state, { payload }) => {
      state.forgetPassword = !state.forgetPassword
    },
    getStateValues: (state, { payload }) => {
      const { name, value } = payload
      state[name] = value
    },
    queryProducts: (state, { payload }) => {
      state.userList = payload.result
      state.nbHits = payload.total
    },
    nextOrder: (state, { payload }) => {
      state.page = state.page + 1
    },
    prevOrder: (state, { payload }) => {
      state.page = state.page - 1
    },
    indexOrder: (state, { payload }) => {
      const index = Number(payload)

      state.page = index
    },
  },
  extraReducers: {
    [userThunk.pending]: (state, { payload }) => {
      console.log('promise pending')
      state.isLoading = true
    },
    [userThunk.fulfilled]: (state, { payload }) => {
      console.log('promise full filled')
      state.isLoading = false
    },
    [userThunk.rejected]: (state, { payload }) => {
      console.log('promise rejected')
      state.isLoading = false
    },
    // Register a user
    [registerUserThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [registerUserThunk.fulfilled]: (state, { payload }) => {
      setUserInLocalStorage(payload)
      state.token = payload.token
      state.userName = payload.user.name
      state.isMember = payload.isAdmin
      state.isLoading = false
      toast.success(`Welcome ${payload.user.name.toUpperCase()}.`)
    },
    [registerUserThunk.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(`${payload?.msg ? payload.msg : payload}`)
    },
    // login a user
    [loginUserThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [loginUserThunk.fulfilled]: (state, { payload }) => {
      console.log(payload)
      setUserInLocalStorage(payload)
      state.token = payload.token
      state.userName = payload.user.name
      state.isMember = payload.isAdmin
      state.isLoading = false
      toast.success(`Welcome back ${payload.user.name.toUpperCase()}.`)
    },
    [loginUserThunk.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(`${payload?.msg ? payload.msg : payload}`)
    },
    // verify a user
    [verifyUserThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [verifyUserThunk.fulfilled]: (state, { payload }) => {
      state.isLoading = false

      toast.success(payload)
    },
    [verifyUserThunk.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(`${payload?.msg ? payload.msg : payload}`)
    },
    // Forget Password Link
    [forgetPasswordLinkThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [forgetPasswordLinkThunk.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      toast.success(payload)
    },
    [forgetPasswordLinkThunk.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(`${payload?.msg ? payload.msg : payload}`)
    },
    // Forget Password change
    [forgetPasswordChangeThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [forgetPasswordChangeThunk.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      toast.success(payload)
    },
    [forgetPasswordChangeThunk.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(`${payload?.msg ? payload.msg : payload}`)
    },
    // Change Password
    [changePasswordThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [changePasswordThunk.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      toast.success(payload)
    },
    [changePasswordThunk.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(`${payload?.msg ? payload.msg : payload}`)
    },
    // get all users
    [getUsersThunk.pending]: (state, { payload }) => {
      state.isLoading = true
    },
    [getUsersThunk.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      const { result, total } = payload
      state.userList = result
      state.nbHits = total
    },
    [getUsersThunk.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(`${payload?.msg ? payload.msg : payload}`)
    },
  },
})
export const {
  getStateValues,
  queryProducts,
  nextOrder,
  prevOrder,
  indexOrder,
  createFunction,
  logOut,
  forgetPasswordToggle,
} = userSlice.actions
export default userSlice.reducer
