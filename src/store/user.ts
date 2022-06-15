import { createModel } from '@rematch/core';
import { RootModel } from './index';

interface IState {
  uid: null | number
}

const initialState: IState = {
  uid: null
}

export const user = createModel<RootModel>()({
  state: initialState,
  reducers: {
    changeUID: (state, payload: number) => ({
      ...state,
      uid: payload,
    }),
  },
  effects: (dispatch) => ({
    setUID: (payload: number) => {
      dispatch.user.changeUID(payload);
    },
  }),
});
