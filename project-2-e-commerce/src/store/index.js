import { configureStore } from '@reduxjs/toolkit'
import ProductsReducer from './slices/ProductsSlice'
import UserReducer from './slices/UserSlice'
import Notification from './slices/NotificationSlice'

export const store = configureStore({
    reducer: {
        products: ProductsReducer,
        user: UserReducer,
        notification: Notification,
    }
})
