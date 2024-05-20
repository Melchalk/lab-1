import { createSlice } from "@reduxjs/toolkit"

interface LoginState {
    token: string | null
}

const initialState: LoginState = {
    token: null,
}

export const authSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        addToken: (state, action) => {
            localStorage.setItem('token', action.payload);
            state.token = action.payload
        }
    },
})

export const { addToken } = authSlice.actions