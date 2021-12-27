import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    type: '', 
    message: ''
}

export const NotificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        clearNotification: (state) => {
            state.message = ''
            state.type = ''
        },
        setNotification: (state, action) => {
            state.message = action.payload.message
            state.type = action.payload.type
        }
    }
})

export const { clearNotification, setNotification } = NotificationSlice.actions
export const notificationSelect = ({notification}) => notification
export default NotificationSlice.reducer
