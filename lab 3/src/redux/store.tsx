import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './counterSlice'
import { authSlice } from './loginSlice'

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    auth: authSlice.reducer
  },
  devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch