import { createModel } from '@rematch/core';
import { RootModel } from './index';
export const player = createModel<RootModel>()({
  state: {
    showPlayer: false,
  },
  reducers: {
    showPlayer: (state, payload: boolean) => ({
      ...state,
      showPlayer: payload,
    }),
  },
  effects: (dispatch) => ({
    setShowPlayer: (payload: boolean) => {
      dispatch.player.showPlayer(payload);
    },
  }),
});
