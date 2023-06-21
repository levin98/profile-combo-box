import { createSlice } from '@reduxjs/toolkit'

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profiles: [
        {
            id: 1,
            name: 'Profile 1',
        }
    ],
  },
  reducers: {
    add: (state, action) => {
        state.profiles.unshift(action.payload);
    },
    update: (state, action) => {
        state.profiles = state.profiles.map(p => p.id === action.payload.id ? action.payload : p);
    },
    remove: (state, action) => {
        state.profiles = state.profiles.filter(p => p.id !== action.payload);
    },
  },
})

export const { add, update, remove } = profileSlice.actions

export default profileSlice.reducer