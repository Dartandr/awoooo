import { createSlice } from '@reduxjs/toolkit';

export const librarySlice = createSlice({
  name: 'library',
  initialState: {
    animes: [],
  },
  reducers: {
    updateLibrary: (state, action) => {
      state.animes = action.payload;
    },
  },
});

export const { updateLibrary } = librarySlice.actions;

export default librarySlice.reducer;
