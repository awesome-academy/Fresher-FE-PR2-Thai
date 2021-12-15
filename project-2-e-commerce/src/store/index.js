import { configureStore } from '@reduxjs/toolkit'
import ProductsReducer from './slices/ProductsSlice'
import UserReducer from './slices/UserSlice'

export const store = configureStore({
    reducer: {
        products: ProductsReducer,
        user: UserReducer
    }
})
