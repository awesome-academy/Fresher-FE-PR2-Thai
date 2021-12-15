import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLogged: false,
    carts: []
}

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: {
        
    },
})

export default UserSlice.reducer
