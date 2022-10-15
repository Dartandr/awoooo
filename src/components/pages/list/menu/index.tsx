import React from 'react';
import style from './index.module.scss';
import GenresCheckbox from './genres';
import StatusCheckbox from './status';
import TypesCheckbox from './type';
import RatingCheckbox from './rating';

const ListMenu: React.FC = () => {
    return (
    <div className={style.wrapper}>
      <div className={style.sorting}>
      <div className={style.sortTitle}>Status</div>
        <div className={style.checkboxesWrapper}>
          <StatusCheckbox />
        </div>
        <div className={style.spacingline}></div>
        <div className={style.sortTitle}>Type</div>
        <div className={style.checkboxesWrapper}>
          <TypesCheckbox />
        </div>
        <div className={style.spacingline}></div>
        <div className={style.sortTitle}>Rating</div>
        <div className={style.checkboxesWrapper}>
          <RatingCheckbox />
        </div>
        <div className={style.spacingline}></div>
        <div className={style.sortTitle}>Genres</div>
        <div className={style.checkboxesWrapper}>
          <GenresCheckbox />
        </div>
      </div>
    </div>
  );
};

export default ListMenu;
