import { createSlice } from '@reduxjs/toolkit';

interface IState {
  uid: null | number;
}

const initialState: IState = {
  uid: null,
};

export const userSlice = createSlice({
  name: 'list',
  initialState: initialState,
  reducers: {
    changeUID: (state, action) => {
      state.uid = action.payload;
    },
  },
});

export const { changeUID } = userSlice.actions;

export default userSlice.reducer;
