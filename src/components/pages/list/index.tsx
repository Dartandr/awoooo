import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './index.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

import ListMenu from './menu';
import scrollProgressBar from '../../helpers/scrollProgressBar';

const ListPage: React.FC = () => {
  const goToAnime = (id: string): void => {
    console.log(id);
  };

  const listElements = () => {
    const list = useSelector((state: RootState) => state.list.animes);
    return list.map((element, index) => (
      <NavLink
        key={element.id}
        to={'/anime/' + element.id}
        onClick={() => {
          goToAnime(element.id);
        }}
      >
        <div className={style.elementWrapper} key={index}>
          <div>
            <div className={`${style.verticalAlign} ${style.firstColumn}`}>
              {index + 1}
            </div>
          </div>
          <div>
            <img src={element.image} alt="poster" />
          </div>
          <div>
            <div className={`${style.verticalAlign} ${style.titleColumn}`}>
              {element.title}
            </div>
          </div>
          <div>
            <div className={`${style.verticalAlign} ${style.fourthColumn}`}>
              {element.score ? element.score : '- '} /10
            </div>
          </div>
          <div>
            <div className={`${style.verticalAlign} ${style.fivesColumn}`}>
              {element.type}
            </div>
          </div>
          <div>
            <div className={`${style.verticalAlign} ${style.sixColumn}`}>
              {element.progress}/{element.episodes}
            </div>
          </div>
        </div>
      </NavLink>
    ));
  };

  const progressBar = () => {
    const progress = document.getElementsByClassName(
      'scrollbar',
    ) as HTMLCollectionOf<HTMLElement>;
    const scrollElement = document.getElementsByClassName(
      style.scrollableContent,
    ) as HTMLCollectionOf<HTMLElement>;
    scrollProgressBar(progress[0], scrollElement[0]);
  };

  return (
    <div className={style.wrapper}>
      <div>
        <div className={'scrollbar'} />
        <div className={style.content}>
          <div className={style.tableLabels}>
            <div>#</div>
            <div>Image</div>
            <div className={style.tableLabelName}>Name</div>
            <div>Score</div>
            <div>Type</div>
            <div>Progress</div>
          </div>
          <div className={style.spacerLine} />
          <div className={style.scrollableContent} onScroll={progressBar}>
            {listElements()}
          </div>
        </div>
      </div>
      <div className={style.menu}>
        <ListMenu />
      </div>
    </div>
  );
};

export default ListPage;
