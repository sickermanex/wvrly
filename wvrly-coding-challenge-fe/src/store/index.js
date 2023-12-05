import { configureStore } from '@reduxjs/toolkit'
import usersDataReducer from './slices/userData.slice'

export const store = configureStore({
  reducer: {
    usersData: usersDataReducer
  },
})
