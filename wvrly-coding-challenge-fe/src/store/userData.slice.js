import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: {
    data: [],
    error: null,
    loading: false
  }
}

export const usersDataSlice = createSlice({
  name: 'usersData',
  initialState,
  reducers: {
    getAllUsersData: async (state, action) => {
      console.log(action.payload)
      state.users = action.payload
    },
    saveUserData: async (state, action) => {
      state.users = action.payload;
    },
    searchUserData: async (state, action) => {
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