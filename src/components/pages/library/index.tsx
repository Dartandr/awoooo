import React from 'react';
import getAnime from './getImg';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { selectFile, showPlayer } from '@/store/playerState';
import { importFolder } from './libraryWork';
import AnimeCard from './animeCard';

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
  const animes = useSelector((state: RootState) => state.library.animes);
  console.log(animes);
  const animeCards = animes.map((anime,id)=><AnimeCard key={id} title={anime.title} id={anime.id} img={anime.episodes[0].img} />)

  return (
    <div>
      <input
        id="file-input"
        type="file"
        name="name"
        onChange={onFileSelected}
        multiple
      />
      <div
        style={{ height: '100px', width: '100px', backgroundColor: 'red' }}
        onDrop={(e) => {
          importFolder(e.dataTransfer.files[0].path);
        }}
        onDragOver={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      />
      {animeCards}
    </div>
  );
};

export default Library;
