import { createModel } from '@rematch/core';
import { RootModel } from './index';
export const navigation = createModel<RootModel>()({
  state: {
    page: '',
  },
  reducers: {
    changePage: (state, payload: string) => ({
      ...state,
      page: payload,
    }),
  },
  effects: (dispatch) => ({
    setPage: (payload: string) => {
      dispatch.navigation.changePage(payload);
    },
  }),
});
