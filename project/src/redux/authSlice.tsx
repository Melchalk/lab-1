import { createSlice } from "@reduxjs/toolkit"

interface AuthState {
    isLogin: boolean
    accessToken: string | null
    refreshToken: string | null
    id: string | null,
    libraryNumber: number | null
}

const initialState: AuthState = {
    isLogin: localStorage.getItem('accessToken') != null,
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: null,
    id: localStorage.getItem('id'),
    libraryNumber: localStorage.getItem('libraryNumber') != 'null'
        ? Number(localStorage.getItem('libraryNumber'))
        : null
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
        addRefreshToken: (state, action) => {
            localStorage.setItem('refreshToken', action.payload);
            state.refreshToken = action.payload
        },
        addId: (state, action) => {
            localStorage.setItem('id', action.payload)
            state.id = action.payload;
        },
        addLibraryNumber: (state, action) => {
            localStorage.setItem('libraryNumber', action.payload),
            state.libraryNumber = action.payload;
        },
        logout: (state) => {
            localStorage.removeItem('accessToken'),
            localStorage.removeItem('id')
            state.isLogin = false;
        }
    },
})

export const { addAuthToken, addRefreshToken, addId, logout, addLibraryNumber } = authSlice.actions