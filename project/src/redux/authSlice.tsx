import { createSlice } from "@reduxjs/toolkit"

interface AuthState {
    isLogin: boolean
    accessToken: string | null
}

const initialState: AuthState = {
    isLogin: localStorage.getItem('accessToken') != null,
    accessToken: localStorage.getItem('accessToken'),
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addAuthToken: (state, action) => {
            localStorage.setItem('accessToken', action.payload);
            state.accessToken = action.payload;
            state.isLogin = true;
        },
        logout: (state) => {
            localStorage.removeItem('accessToken'),
            localStorage.removeItem('id')
            state.isLogin = false;
        }
    },
})

export const { addAuthToken, logout } = authSlice.actions