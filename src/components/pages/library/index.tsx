import React from 'react';
import getAnime from './getImg';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@/store';

const Library: React.FC = () => {
  const playerDispatcher = useDispatch<Dispatch>().player;

  const onFileSelected = (e: React.ChangeEvent) => {
    if ((e.target as HTMLInputElement).files.length > 0) {
      const path = (e.target as HTMLInputElement).files[0].path;
      getAnime(path);
      playerDispatcher.setShowPlayer(true);
      playerDispatcher.setFile(path);
    }
  };
  return (
    <>
      <input
        id="file-input"
        type="file"
        name="name"
        onChange={onFileSelected}
      />
    </>
  );
};

export default Library;
