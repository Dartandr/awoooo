import React from 'react';
import getAnime from './getImg';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { selectFile, showPlayer } from '@/store/playerState';

const Library: React.FC = () => {
  const dispatcher = useDispatch<AppDispatch>();

  const onFileSelected = (e: React.ChangeEvent) => {
    if ((e.target as HTMLInputElement).files.length > 0) {
      const path = (e.target as HTMLInputElement).files[0].path;
      getAnime(path);
      dispatcher(showPlayer(true));
      dispatcher(selectFile(path));
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
