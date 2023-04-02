import { createSlice } from '@reduxjs/toolkit';

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    page: '',
    settings: false,
  },
  reducers: {
    changePage: (state, action) => {
      state.page = action.payload
    },
    changeSettings: (state, action)=>{
      state.settings = action.payload
    }
  },
});

export const { changePage, changeSettings } =
navigationSlice.actions;

export default navigationSlice.reducer;
