import { createSlice } from '@reduxjs/toolkit';

interface IPlayerPos {
  x: number;
  y: number;
}

interface IState {
  showPlayer: boolean;
  selectedFile: string;
  position: IPlayerPos;
}

const initialState: IState = {
  showPlayer: false,
  selectedFile: '',
  position: {
    x: 20,
    y: 20,
  },
};

export const playerSlice = createSlice({
  name: 'player',
  initialState: initialState,
  reducers: {
    showPlayer: (state, action) => {
      state.showPlayer = action.payload;
    },
    changePosition: (state, action) => {
      state.position = action.payload;
    },
    selectFile: (state, action) => {
      state.selectedFile = action.payload;
    },
  },
});

export const { showPlayer, changePosition, selectFile } = playerSlice.actions;

export default playerSlice.reducer;
