import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    isLogged: false,
    isSuccessAdd: false,
    userData: null,
    isLoading: false,
    localCarts: []
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
        setIsAddSuccess: (state, action) => {state.isSuccessAdd = action.payload},
        updateLocalCarts: (state, action) => {state.localCarts = action.payload}
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
                state.error = action.payload.errorMessage
            } else {
                state.error = action.error.message
            }
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
                state.error = action.payload.errorMessage
            } else {
                state.error = action.error.message
            }
        })
    },
})
export const { setIsAddSuccess, setIsLogged, updateLocalCarts } = UserSlice.actions
export default UserSlice.reducer
