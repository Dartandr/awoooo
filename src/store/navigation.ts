import { createModel } from '@rematch/core';
import { RootModel } from './index';
export const navigation = createModel<RootModel>()({
  state: {
    page: '',
    settings: false,
  },
  reducers: {
    changePage: (state, payload: string) => ({
      ...state,
      page: payload,
    }),
    changeSettings: (state, payload: boolean) => ({
      ...state,
      settings: payload,
    }),
  },
  effects: (dispatch) => ({
    setPage: (payload: string) => {
      dispatch.navigation.changePage(payload);
    },
    setSettings:(payload: boolean) =>{
      dispatch.navigation.changeSettings(payload);
    }
  }),
});
