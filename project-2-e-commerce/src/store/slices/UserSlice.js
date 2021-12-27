import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    isLoading: false,
    cityArray: null,
    districts: null,
    paymentForm: {
        email: '',
        name: '',
        phone: '',
        address: '',
        city: '',
        district: '',
        note: ''
    },
    loginForm: {
        email: '',
        password: ''
    },
    signupForm: {
        email: '',
        password: '',
        name: '',
        phone: ''
    },
    isLogging: false,
    isSignup: false,
    cartsLength: 0,
    error: '',
    userLogin: ''
}

export const addUser = createAsyncThunk(
    'user/post',
    async (item, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/users`, item)
            return res.data
        }
        catch(err) {
            return rejectWithValue(err.res.data)
        }
    }
)

export const updateUserCart = createAsyncThunk(
    'cart/update',
    async ({ userId, carts }, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`${process.env.REACT_APP_BASE_URL}/users/${userId}`, {carts})
            return res.data
        }
        catch(err) {
            return rejectWithValue(err.res.data)
        }
    }
)

export const getUserData = createAsyncThunk(
    'user/get',
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${id}`)
            return res.data
        }
        catch(err) {
            return rejectWithValue(err.res.data)
        }
    }
)

export const getCityArray = createAsyncThunk(
    'city/get',
    async (filter, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/province`)
            return res.data
        }
        catch(err) {
            return rejectWithValue(err.res.data)
        }
    }
)

export const addUserOrders = createAsyncThunk(
    'order/post',
    async ({userId, newOrdersList}, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`${process.env.REACT_APP_BASE_URL}/users/${userId}`, {orders: newOrdersList})
            return res.data
        }
        catch(err) {
            return rejectWithValue(err.res.data)
        }
    }
)

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsLogged: (state, action) => {state.isLogged = action.payload},
        setDistricsArray: (state, action) => {state.districts = action.payload},
        setPaymentForm: (state, action) => {state.paymentForm = action.payload},
        setIsLogging: (state, action) => {state.isLogging = action.payload},
        setIsSignup: (state, action) => {state.isSignup = action.payload},
        setLoginForm: (state, action) => {state.loginForm = action.payload},
        setSignupForm: (state, action) => {state.signupForm = action.payload},
        setCartsLength: (state, action) => {state.cartsLength = action.payload}
    },
    extraReducers: builder => {
        builder
        .addCase(getUserData.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getUserData.fulfilled, (state, action) => {
            state.isLoading = false
            const deletePassword = ({password, ...obj}) => ({...obj})
            const localUser = deletePassword(action.payload)
            localStorage.setItem('user-login', JSON.stringify(localUser))
            localStorage.setItem('is-logged', JSON.stringify(true))
            state.userLogin = action.payload
        })
        .addCase(getUserData.rejected, (state, action) => {
            state.isLoading = false
            if (action.payload) {
                state.error = action.payload.errorMessage
            } else {
                state.error = action.error.message
            }
        })
        .addCase(getCityArray.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getCityArray.fulfilled, (state, action) => {
            state.isLoading = false
            state.cityArray = action.payload
        })
        .addCase(getCityArray.rejected, (state, action) => {
            state.isLoading = false
            if (action.payload) {
                state.error = action.payload.errorMessage
            } else {
                state.error = action.error.message
            }
        })
    },
})

export const { setDistricsArray, setPaymentForm,
    setIsLogging, setIsSignup, setLoginForm,
    setSignupForm, setCartsLength } = UserSlice.actions
    
export default UserSlice.reducer
