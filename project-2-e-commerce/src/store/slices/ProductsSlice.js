import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filter: {
        q: '',
    }
}

export const ProductsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        searchByWords: (state, action) => {
            state.filter.q = action.payload
        }
    },
    extraReducers: {

    },
})

export const { searchByWords } = ProductsSlice.actions
export default ProductsSlice.reducer
