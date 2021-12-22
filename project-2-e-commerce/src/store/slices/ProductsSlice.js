import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import queryString from 'query-string'

const initialState = {
    special: {
        filter: {
            _limit: 8,
            _page: 1,
            type_like: 'special'
        },
        list: [],
        isLoading: false,
    },
    all: {
        filter: {
            _page: 1,
            _limit: 12,
            q: ''
        },
        list: [],
        isLoading: false,
    },
    new: {
        filter: {
            _page: 1,
            _limit: 8,
            type_like: 'new'
        },
        list: [],
        isLoading: false,
    },
    sale: {
        filter: {
            '_page': 1,
            '_limit': 8,
            type_like: 'sale'
        },
        list: [],
        isLoading: false,
    },
    error: null,
    typeRendering: 'all',
    currentPage: 1,
    pagination: {
        list: [],
        isLoading: false
    },
    productDetail: {
        isLoading: false,
        content: [],
        siminar: {
            isLoading: false,
            list: []
        }
    }
}

export const getNewProds = createAsyncThunk(
    'products/new',
    async (filter, { rejectWithValue }) => {
        try {
            const stringified = queryString.stringify(filter, {arrayFormat: 'index'})
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/products?${stringified}`)
            const data = res.data
            return { data, filter }
        }
        catch(err) {
            return rejectWithValue(err.res.data)
        }
    }
)

export const getProducts = createAsyncThunk(
    'products/all',
    async (filter, { rejectWithValue }) => {
        try {
            const stringified = queryString.stringify(filter, {arrayFormat: 'index'})
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/products?${stringified}`)
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
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/products?${stringified}`)
            const data = res.data
            return { data, filter }
        }
        catch(err) {
            return rejectWithValue(err.res.data)
        }
    }
)

export const getPagination = createAsyncThunk(
    'pagination',
    async (filter, { rejectWithValue }) => {
        try {
            const stringified = queryString.stringify(filter, {arrayFormat: 'index'})
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/products?${stringified}`)
            return res.data
        }
        catch(err) {
            return rejectWithValue(err.res.data)
        }
    }
)

export const getProductById = createAsyncThunk(
    'product',
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/products?id=${id}`)
            return res.data
        }
        catch(err) {
            return rejectWithValue(err.res.data)
        }
    }
)

export const getSiminarProducts = createAsyncThunk(
    'product/siminar',
    async (brand, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/products?brand=${brand}&_limit=4`)
            return res.data
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
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setTypeRendering: (state, action) => {
            state.typeRendering = action.payload
        },
        setProductsFilter: (state, action) => {
            state.all.filter = action.payload
        },
        prevPage: (state) => {
            state.currentPage--
        },
        nextPage: (state) => {
            state.currentPage++
        },
        resetFilter: (state) => {
            state.all.filter = {
                _page: 1,
                _limit: 12,
                q: ''
            }
            state.currentPage = 1
            state.typeRendering = 'all'
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
        .addCase(getProducts.pending, (state) => {
            state.all.isLoading = true
        })
        .addCase(getProducts.fulfilled, (state, action) => {
            state.all.isLoading = false
            state.all.list = action.payload.data
            state.all.filter = action.payload.filter
        })
        .addCase(getProducts.rejected, (state, action) => {
            state.all.isLoading = false
            if (action.payload) {
                state.error = action.payload.errorMessage
            } else {
                state.error = action.error.message
            }
        })
        .addCase(getPagination.pending, (state) => {
            state.pagination.isLoading = true
        })
        .addCase(getPagination.fulfilled, (state, action) => {
            state.pagination.isLoading = false
            state.pagination.list = action.payload
        })
        .addCase(getPagination.rejected, (state, action) => {
            state.pagination.isLoading = false
            if (action.payload) {
                state.error = action.payload.errorMessage
            } else {
                state.error = action.error.message
            }
        })
        .addCase(getProductById.pending, (state) => {
            state.productDetail.isLoading = true
        })
        .addCase(getProductById.fulfilled, (state, action) => {
            state.productDetail.isLoading = false
            state.productDetail.content = action.payload
        })
        .addCase(getProductById.rejected, (state, action) => {
            state.productDetail.isLoading = false
            if (action.payload) {
                state.error = action.payload.errorMessage
            } else {
                state.error = action.error.message
            }
        })
        .addCase(getSiminarProducts.pending, (state) => {
            state.productDetail.siminar.isLoading = true
        })
        .addCase(getSiminarProducts.fulfilled, (state, action) => {
            state.productDetail.siminar.isLoading = false
            state.productDetail.siminar.list = action.payload
        })
        .addCase(getSiminarProducts.rejected, (state, action) => {
            state.productDetail.siminar.isLoading = false
            if (action.payload) {
                state.error = action.payload.errorMessage
            } else {
                state.error = action.error.message
            }
        })
    },
})

export const { 
    searchByWords, setCurrentPage, setTypeRendering,
    prevPage, nextPage, resetFilter, setProductsFilter
} = ProductsSlice.actions
export default ProductsSlice.reducer
