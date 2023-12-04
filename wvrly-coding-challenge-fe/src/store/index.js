import { configureStore } from '@reduxjs/toolkit'
import usersDataReducer from './userData.slice'

export const store = configureStore({
  reducer: {
    usersData: usersDataReducer
  },
})
