import { createModel } from '@rematch/core';
import { RootModel } from './index';

interface IPlayerPos {
  x: number;
  y: number;
}

export const player = createModel<RootModel>()({
  state: {
    showPlayer: false,
    selectedFile: '',
    position: {
      x: 20,
      y: 20,
    },
  },
  reducers: {
    showPlayer: (state, payload: boolean) => ({
      ...state,
      showPlayer: payload,
    }),
    changePosition: (state, payload: IPlayerPos) => ({
      ...state,
      position: payload,
    }),
    selectFile: (state, payload: string) => ({
      ...state,
      selectedFile: payload,
    }),
  },
  effects: (dispatch) => ({
    setShowPlayer: (payload: boolean) => {
      dispatch.player.showPlayer(payload);
    },
    setPlayerPosition: (payload: IPlayerPos) => {
      dispatch.player.changePosition(payload);
    },
    setFile: (payload: string) => {
      dispatch.player.selectFile(payload);
    },
  }),
});
