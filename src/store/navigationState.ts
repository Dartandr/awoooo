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





// export const navigation = createModel<RootModel>()({
//   state: {
//     page: '',
//     settings: false,
//   },
//   reducers: {
//     changePage: (state, payload: string) => ({
//       ...state,
//       page: payload,
//     }),
//     changeSettings: (state, payload: boolean) => ({
//       ...state,
//       settings: payload,
//     }),
//   },
//   effects: (dispatch) => ({
//     setPage: (payload: string) => {
//       dispatch.navigation.changePage(payload);
//     },
//     setSettings:(payload: boolean) =>{
//       dispatch.navigation.changeSettings(payload);
//     }
//   }),
// });
