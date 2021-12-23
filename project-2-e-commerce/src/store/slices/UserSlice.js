import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    isLogged: false,
    addedItem: '',
    userData: null,
    isLoading: false,
    notification: {type: '', message: ''},
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
    }
}

export const addToCart = createAsyncThunk(
    'cart/post',
    async (item, id, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/${id}/cart`, item)
            return res.data
        }
        catch(err) {
            return rejectWithValue(err.res.data)
        }
    }
)

export const updateUserCart = createAsyncThunk(
    'cart/update',
    async (userId, cart, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`${process.env.REACT_APP_BASE_URL}/users/${userId}/cart/${cart.id}`, cart)
            return res.data
        }
        catch(err) {
            return rejectWithValue(err.res.data)
        }
    }
)

export const deleteUserCart = createAsyncThunk(
    'cart/delele',
    async (userId, cartId, { rejectWithValue }) => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/users/${userId}/cart/${cartId}`)
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
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/users?id=${id}`)
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
    async (id, item, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/${id}/order`, item)
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
        setAddedItem: (state, action) => {
            state.addedItem = action.payload.item
            state.notification.message = action.payload.message
            state.notification.type = 'success'
        },
        clearNotification: (state) => {
            state.notification.message = ''
            state.notification.type = ''
        },
        setDistricsArray: (state, action) => {state.districts = action.payload},
        setPaymentForm: (state, action) => {state.paymentForm = action.payload},
    },
    extraReducers: builder => {
        builder
        .addCase(addToCart.pending, (state) => {
            state.isLoading = true
        })
        .addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false
            state.userData.cart.push(action.payload)
            state.isSuccessAdd = true
        })
        .addCase(addToCart.rejected, (state, action) => {
            state.isLoading = false
            if (action.payload) {
                state.notification.message = action.payload.errorMessage
            } else {
                state.notification.message = action.error.message
            }
            state.notification.type = 'error'
        })
        .addCase(getUserData.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getUserData.fulfilled, (state, action) => {
            state.isLoading = false
            state.userData = action.payload
        })
        .addCase(getUserData.rejected, (state, action) => {
            state.isLoading = false
            if (action.payload) {
                state.notification.message = action.payload.errorMessage
            } else {
                state.notification.message = action.error.message
            }
            state.notification.type = 'error'
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
                state.notification.message = action.payload.errorMessage
            } else {
                state.notification.message = action.error.message
            }
            state.notification.type = 'error'
        })
        .addCase(addUserOrders.pending, (state) => {
            state.isLoading = true
        })
        .addCase(addUserOrders.fulfilled, (state, action) => {
            state.isLoading = false
            state.userData.orders.push(action.payload)
        })
        .addCase(addUserOrders.rejected, (state, action) => {
            state.isLoading = false
            if (action.payload) {
                state.notification.message = action.payload.errorMessage
            } else {
                state.notification.message = action.error.message
            }
            state.notification.type = 'error'
        })
    },
})

export const { setAddedItem, setIsLogged, incrementQuantity, 
    clearNotification, setDistricsArray, setPaymentForm } = UserSlice.actions
export default UserSlice.reducer
