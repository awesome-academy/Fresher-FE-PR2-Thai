import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import queryString from 'query-string'

const initialState = {
    isLoggingAdmin: false, 
    users: [],
    idAdmin: process.env.REACT_APP_ADMIN_ID,
    emailAdmin: process.env.REACT_APP_ADMIN_EMAIL,
    error: '',
    isLoading: false,
    loginAdminForm: {
        email: '',
        password: ''
    },
    isOpenEditModal: false,
    isOpenDeleteModal: false,
    isAddProduct: false,
    editForm: {},
    ordersList: '',
    filterOrders: {}
}

export const getAdminAccount = createAsyncThunk(
    'admin/get',
    async (id, {rejectWithValue}) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin`)
            return res.data
        }
        catch(err) {
            return rejectWithValue(err.res.data)
        }
    }
)

export const getData = createAsyncThunk(
    'data/get',
    async ({src, filter = {}}, {rejectWithValue}) => {
        const stringified = queryString.stringify(filter, {arrayFormat: 'index'})
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/${src}?${stringified}`)
            return {data: res.data, src, filter}
        }
        catch(err) {
            return rejectWithValue(err.res.data)
        }
    }
)

export const getOrders = createAsyncThunk(
    'orders/get',
    async (filter = {}, {rejectWithValue}) => {
        const stringified = queryString.stringify(filter, {arrayFormat: 'index'})
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/orders?${stringified}`)
            return {data: res.data, filter}
        }
        catch(err) {
            return rejectWithValue(err.res.data)
        }
    }
)

export const addOrdersAdmin = createAsyncThunk(
    'orders/add',
    async (obj, {rejectWithValue}) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/orders`, obj)
            return res.data
        }
        catch(err) {
            return rejectWithValue(err.res.data)
        }
    }
)

export const updateOrdersAdmin = createAsyncThunk(
    'orders/update',
    async ({id, newOderItem}, {rejectWithValue}) => {
        try {
            const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/orders/${id}`, newOderItem)
            return res.data
        }
        catch(err) {
            return rejectWithValue(err.res.data)
        }
    }
)

export const AdminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setIsLoggingAdmin: (state, action) => {
            state.isLoggingAdmin = action.payload
        },
        setLoginAdminForm: (state, action) => {
            state.loginAdminForm = action.payload
        },
        setIsOpenEditModal: (state, action) => {
            state.isOpenEditModal = action.payload
        },
        setIsOpenDeleteModal: (state, action) => {
            state.isOpenDeleteModal = action.payload
        },
        setIsAddProduct: (state, action) => {
            state.isAddProduct = action.payload
        },
        setEditForm: (state, action) => {
            state.editForm = action.payload
        },
    },
    extraReducers: builder => {
        builder
        .addCase(getData.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getData.fulfilled, (state, action) => {
            state.isLoading = false
            const { data, src, filter } = action.payload
            state[src] = data
            state.filterUsers = filter
        })
        .addCase(getData.rejected, (state, action) => {
            state.isLoading = false
            if (action.payload) {
                state.error = action.payload.errorMessage
            } else {
                state.error = action.error.message
            }
        })
        .addCase(getOrders.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getOrders.fulfilled, (state, action) => {
            state.isLoading = false
            const { data, filter } = action.payload
            state.ordersList = data
            state.filterOrders = filter
        })
        .addCase(getOrders.rejected, (state, action) => {
            state.isLoading = false
            if (action.payload) {
                state.error = action.payload.errorMessage
            } else {
                state.error = action.error.message
            }
        })
    }
})

export const { setIsLoggingAdmin, setLoginAdminForm, setIsOpenEditModal,
    setIsOpenDeleteModal, setEditForm, setIsAddProduct } = AdminSlice.actions
export const adminSelector = ({admin}) => admin
export default AdminSlice.reducer
