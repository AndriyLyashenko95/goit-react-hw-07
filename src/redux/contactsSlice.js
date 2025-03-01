import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact as deleteContactOps } from './contactsOps';
import { createSelector } from 'reselect';

const initialState = {
  contacts: {
    items: [],
    loading: false,
    error: null
  },
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    deleteContact: (state, action) => {  
      state.contacts.items = state.contacts.items.filter(
        (contact) => contact.id !== action.payload
      );
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.contacts.loading = true;
        state.contacts.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.loading = false;
        state.contacts.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.contacts.loading = false;
        state.contacts.error = action.payload;
      })
      .addCase(addContact.pending, (state) => {
        state.contacts.loading = true;
        state.contacts.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.loading = false;
        state.contacts.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.contacts.loading = false;
        state.contacts.error = action.payload;
      })
      .addCase(deleteContactOps.pending, (state) => {
        state.contacts.loading = true;
        state.contacts.error = null;
      })
      .addCase(deleteContactOps.fulfilled, (state, action) => {
        state.contacts.loading = false;
        state.contacts.items = state.contacts.items.filter(
          (contact) => contact.id !== action.payload
        );
      })
      .addCase(deleteContactOps.rejected, (state, action) => {
        state.contacts.loading = false;
        state.contacts.error = action.payload;
      });
  },
});

export const selectContacts = (state) => state.contacts.contacts.items;
export const selectLoading = (state) => state.contacts.contacts.loading;
export const selectError = (state) => state.contacts.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, (state) => state.filters.filters.name],
  (contacts, filter) => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);

export default contactsSlice.reducer;
export const contactsReducer = contactsSlice.reducer;
export const { deleteContact } = contactsSlice.actions;