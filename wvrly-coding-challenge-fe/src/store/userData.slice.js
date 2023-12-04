import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: {
    data: [],
    error: null
  }
}

export const usersDataSlice = createSlice({
  name: 'usersData',
  initialState,
  reducers: {
    getAllUsersData: (state, action) => {
      state.users.data = action.payload
    },
    saveUserData: (state, action) => {
      state.users = action.payload;
    },
    searchUserData: (state, action) => {
      state.users = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  getAllUsersData,
  saveUserData,
  searchUserData 
} = usersDataSlice.actions

export default usersDataSlice.reducer