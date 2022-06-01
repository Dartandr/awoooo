import React from 'react';
import style from './index.module.scss';

interface IActivity {
  title: string;
  action: string;
  rate?: string;
  img: string;
  eps?: string;
}

interface Props {
  activities: Array<IActivity>;
}

const Activities: React.FC<Props> = ({activities}) => {
  const blocs = () => {
    let activity;
    if (activities) {
      activity = activities.map((anime) => (
        <div key={anime.title} className={style.block}>
          <img src={anime.img} alt="" />
          <div className={style.animeData}>
            <div className={style.title}>
              {anime.title.length <= 14
                ? anime.title
                : anime.title.slice(0, 14) + ' ...'}
            </div>
            <div className={style.data}>{anime.action}</div>
            {anime.rate && <div className={style.dataSecond}>{anime.rate}</div>}
            {anime.eps && <div className={style.dataSecond}>{anime.eps}</div>}
          </div>
        </div>
      ));
    }
    return activity;
  };

  return <div className={style.activities}>{blocs()}</div>;
};

export default Activities;
