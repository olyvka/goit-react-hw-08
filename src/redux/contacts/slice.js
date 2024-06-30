import { createSlice } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContact,
  deleteContact,
  updateContact,
} from "./../contacts/operations";
import { logout } from "../auth/operations";

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addContact.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.error = null;
        state.loading = false;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteContact.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        // const indexOfContact = state.items.findIndex(
        //   (contact) => contact.id === action.payload
        // );
        // state.items.splice(indexOfContact, 1);
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
        state.error = null;
        state.loading = false;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.items = [];
        state.loading = false;
        state.error = null;
      })
      .addCase(updateContact.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const indexOfContact = state.items.findIndex(
          (contact) => contact.id === action.payload.id
        );
        state.items[indexOfContact] = action.payload;
        // state.loading = false;
      });
  },
});

export default contactsSlice.reducer;
