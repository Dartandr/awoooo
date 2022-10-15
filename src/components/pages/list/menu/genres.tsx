import React, { useEffect } from 'react';
import CustomCheckbox from '@/components/atoms/CustomCheckBox';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { updateGenres } from '@/store/listState';

const Genres: React.FC = () => {
  const genresState = useSelector((state: RootState) => state.list.genres);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log(genresState);
  }, [genresState]);

  const getStatus = (value:string) =>{
    const current = genresState.find((element) => element.name === value)
    if(!current){
      return;
    }
    if(current.status){
      return 'included'
    }
    if(!current.status){
      return 'discluded'
    }
  }

  const genres = [
    'Action',
    'Adventure',
    'Cars',
    'Comedy',
    'Dementia',
    'Demons',
    'Drama',
    'Ecchi',
    'Fantasy',
    'Game',
    'Harem',
    'Hentai',
    'Historical',
    'Horror',
    'Josei',
    'Kids',
    'Magic',
    'Martial Arts',
    'Mecha',
    'Military',
    'Music',
    'Mystery',
    'Parody',
    'Police',
    'Psychological',
    'Romance',
    'Samurai',
    'School',
    'Sci-Fi',
    'Seinen',
    'Shoujo',
    'Shoujo Ai',
    'Shounen',
    'Shounen Ai',
    'Slice of Life',
    'Space',
    'Sports',
    'Super Power',
    'Supernatural',
    'Thriller',
    'Vampire',
    'Yaoi',
    'Yuri',
  ];
  const genresCheckbox = genres.map((genre) => (
    <div
      onClick={() => {
        dispatch(updateGenres(genre));
      }}
      key={genre}
    >
      <CustomCheckbox label={genre} status={getStatus(genre)}/>
    </div>
  ));

  return <div>{genresCheckbox}</div>;
};

export default Genres;
