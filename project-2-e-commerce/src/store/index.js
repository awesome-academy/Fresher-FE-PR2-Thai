import { configureStore } from '@reduxjs/toolkit'
import ProductReducer from './slice/ProductSlice'

const store = configureStore({
    reducer: {
        products: ProductReducer,
    }
})
