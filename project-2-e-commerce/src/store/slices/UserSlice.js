import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    isLogged: false,
    addedItem: '',
    userData: null,
    isLoading: false,
    localCarts: [],
    notification: {type: '', message: ''},
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

export const updateCart = createAsyncThunk(
    'cart/update',
    async (item, id, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`${process.env.REACT_APP_BASE_URL}/users/${id}/cart/${item.id}`, item)
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

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsLogged: (state, action) => {state.isLogged = action.payload},
        updateLocalCarts: (state, action) => {state.localCarts = action.payload},
        setAddedItem: (state, action) => {
            state.addedItem = action.payload.item
            state.notification.message = action.payload.message
            state.notification.type = 'success'
        },
        updateUserCart: (state, action) => {state.userData.cart = action.payload},
        clearNotification: (state) => {
            state.notification.message = ''
            state.notification.type = ''
        }
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
    },
})

export const { setAddedItem, setIsLogged, updateUserCart,
    updateLocalCarts, incrementQuantity, 
    clearNotification } = UserSlice.actions
export default UserSlice.reducer
