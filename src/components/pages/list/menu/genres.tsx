import React,  {useEffect} from 'react';
import CustomCheckbox from '@/components/atoms/CustomCheckBox';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import {updateGenres} from '@/store/listState'
 
const Genres: React.FC = () => {
  const list = useSelector((state: RootState) => state.list);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log('genres.changed')
  }, [list.genres]);

  const getStatus = (genre: string) => {
    if(list.genres.included.indexOf(genre) !== -1){
      return 'included'
    }
    if(list.genres.discluded.indexOf(genre) !== -1){
      return 'discluded'
    }
    return undefined
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
    <div onClick={()=>{dispatch(updateGenres(genre))}} key={genre}>
      <CustomCheckbox label={genre} status={getStatus(genre)}/>
    </div>
  ));

  return <div>{genresCheckbox}</div>;
};

export default Genres;
