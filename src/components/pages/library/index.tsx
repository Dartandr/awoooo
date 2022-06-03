import React from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@/store';

const Library: React.FC = () => {

  const playerDispatcher = useDispatch<Dispatch>().player;

  const onAnimeClick = (): void => {
    playerDispatcher.setShowPlayer(true);
  };
  return (
    <>
      <div onClick={onAnimeClick}>some Content</div>
    </>
  );
};

export default Library;
