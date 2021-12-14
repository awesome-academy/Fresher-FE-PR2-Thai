import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const ProductsSlice = createSlice(
    'products',
    initialState,
    reducers,
    extraReducers,
)

export default ProductsSlice.reducer
