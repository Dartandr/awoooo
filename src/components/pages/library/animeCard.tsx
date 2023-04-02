import React from 'react';
const path = window.require("path");

interface IProps {
  title: string;
  img: string;
  id: string;
}

const AnimeCard: React.FC<IProps> = ({ title, img, id }) => {
  console.log(title, img, id)
  return (
    <div className='library-card'>
      <img src={`file://${path.resolve(img)}`}/>
      <div className='library-card-dim'/>
    </div>
  );
};

export default AnimeCard;
