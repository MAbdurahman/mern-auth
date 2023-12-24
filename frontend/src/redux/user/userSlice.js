import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   currentUser: null,
   loading: false,
   error: false,
};

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      signInStart: (state) => {
         state.loading = true;
      },
      signInSuccess: (state, action) => {
         state.currentUser = action.payload;
         state.loading = false;
         state.error = false;
      },
      signInFailure: (state, action) => {
         state.loading = false;
         state.error = action.payload;
      },
      updateUserStart: (state) => {
         state.loading = true;
      },
      updateUserSuccess: (state, action) => {
         state.currentUser = action.payload;
         state.loading = false;
         state.error = null;
      },
      updateUserFailure: (state, action) => {
         state.error = action.payload;
         state.loading = false;
      },
      deleteUserStart: (state) => {
         state.loading = true;
      },
      deleteUserSuccess: (state) => {
         state.currentUser = null;
         state.loading = false;
         state.error = false;
      },
      deleteUserFailure: (state, action) => {
         state.loading = false;
         state.error = action.payload;
      },
      signOutUserStart: (state) => {
         state.loading = true;
      },
      signOutUserSuccess: (state) => {
         state.currentUser = null;
         state.loading = false;
         state.error = null;
      },
      signOutUserFailure: (state, action) => {
         state.error = action.payload;
         state.loading = false;
      },
      clearError: (state) => {
         state.currentUser = null;
         state.loading = false;
         state.error = null;
      }
   }
});

export const {
   signInStart,
   signInFailure,
   signInSuccess,
   updateUserStart,
   updateUserSuccess,
   updateUserFailure,
   deleteUserStart,
   deleteUserSuccess,
   deleteUserFailure,
   signOutUserStart,
   signOutUserSuccess,
   signOutUserFailure,
   clearError


} = userSlice.actions;

export default userSlice.reducer;