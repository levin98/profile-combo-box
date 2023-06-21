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
    selectedProfileID: 1,
    rename: false,
    renameText: '',
  },
  reducers: {
    add: (state, action) => {
        state.profiles.unshift(action.payload);
        state.selectedProfileID = action.payload.id;
    },
    update: (state, action) => {
        state.profiles = state.profiles.map(p => p.id === action.payload.id ? action.payload : p);
    },
    remove: (state, action) => {
        if (state.profiles.length === 1) {
            return;
        }
        state.profiles = state.profiles.filter(p => p.id !== action.payload);
        state.selectedProfileID = state.profiles[0].id;
    },
    selectProfile: (state, action) => {
        state.selectedProfileID = action.payload;
    },
    setRename: (state, action) => {
        state.rename = action.payload;
    },
    setRenameText: (state, action) => {
        state.renameText = action.payload;
    }
  },
})

export const { add, update, remove, selectProfile, setRename, setRenameText } = profileSlice.actions

export default profileSlice.reducer