import { createSlice } from "@reduxjs/toolkit";
import { login, logout, refreshUser, register } from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: null,
      email: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    isLoading: false, //! немає в конспекті
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true; //! немає в конспекті
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false; //! немає в конспекті
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false; //! немає в конспекті
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true; //! немає в конспекті
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false; //! немає в конспекті
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false; //! немає в конспекті
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true; //! немає в конспекті
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.isLoading = false; //! немає в конспекті
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false; //! немає в конспекті
      })
      .addCase(refreshUser.pending, (state) => {
        state.isLoading = true; //! немає в конспекті
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.isLoading = true; //! немає в конспекті
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isLoading = false; //! немає в конспекті
      });
  },
});

export default authSlice.reducer;
