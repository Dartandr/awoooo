import React from 'react';
import style from './index.module.scss';

const Genres: React.FC = () => {
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
    <div className={style.checkbox} key={genre}>
      <input
        className={style.customCheckbox}
        id={genre}
        name="genre"
        type="checkbox"
        data-where="list"
        data-type="genres"
      />
      <label htmlFor={genre}>{genre}</label>
    </div>
  ));

  return <div>{genresCheckbox}</div>;
};

export default Genres;
