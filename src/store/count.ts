import { createModel } from '@rematch/core';
import { RootModel } from './index';
export const count = createModel<RootModel>()({
  state: {
    someData: 0,
  },
  reducers: {
    incrementState: (state, payload: number) => ({
      ...state,
      someData: state.someData + payload,
    }),
  },
  effects: (dispatch) => ({
    increment: (payload: number) => {
      dispatch.count.incrementState(payload);
    },
  }),
});
