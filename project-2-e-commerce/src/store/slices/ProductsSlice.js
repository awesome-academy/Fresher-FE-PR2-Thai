import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import queryString from 'query-string'

const initialState = {
    special: {
        filter: {
            '_limit': 8,
            '_page': 1,
            type_like: 'special'
        },
        list: [],
        isLoading: false
    },
    all: {
        filter: {
            '_page': 1,
            '_limit': 12,
        },
        list: [],
        isLoading: false
    },
    new: {
        filter: {
            '_page': 1,
            '_limit': 8,
            type_like: 'new'
        },
        list: [],
        isLoading: false
    },
    error: null
}

export const getNewProds = createAsyncThunk(
    'products/new',
    async (filter, { rejectWithValue }) => {
        try {
            const stringified = queryString.stringify(filter, {arrayFormat: 'index'})
            const res = await axios.get(`http://localhost:8000/products?${stringified}`)
            const data = res.data
            return { data, filter }
        }
        catch(err) {
            return rejectWithValue(err.res.data)
        }
    }
)

export const getSpecialProds = createAsyncThunk(
    'products/special',
    async (filter, { rejectWithValue }) => {
        try {
            const stringified = queryString.stringify(filter, {arrayFormat: 'index'})
            const res = await axios.get(`http://localhost:8000/products?${stringified}`)
            const data = res.data
            return { data, filter }
        }
        catch(err) {
            return rejectWithValue(err.res.data)
        }
    }
)

export const ProductsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        searchByWords: (state, action) => {
            state.all.filter.q = action.payload
        }
    },
    extraReducers: builder => {
        builder
        .addCase(getSpecialProds.pending, (state) => {
            state.special.isLoading = true
        })
        .addCase(getSpecialProds.fulfilled, (state, action) => {
            state.special.isLoading = false
            state.special.list = action.payload.data
            state.special.filter = action.payload.filter
        })
        .addCase(getSpecialProds.rejected, (state, action) => {
            state.special.isLoading = false
            if (action.payload) {
                state.error = action.payload.errorMessage
            } else {
                state.error = action.error.message
            }
        })
        .addCase(getNewProds.pending, (state) => {
            state.new.isLoading = true
        })
        .addCase(getNewProds.fulfilled, (state, action) => {
            state.new.isLoading = false
            state.new.list = action.payload.data
            state.new.filter = action.payload.filter
        })
        .addCase(getNewProds.rejected, (state, action) => {
            state.new.isLoading = false
            if (action.payload) {
                state.error = action.payload.errorMessage
            } else {
                state.error = action.error.message
            }
        })
    },
})

export const { searchByWords } = ProductsSlice.actions
export default ProductsSlice.reducer
