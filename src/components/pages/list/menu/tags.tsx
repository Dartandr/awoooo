import React from 'react';
import Cross from '@/assets/icons/customizeble/icon-cross';
import style from './index.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { removeTag, clearAll } from '@/store/listState';

const Tags = () => {
  const dispatch = useDispatch<AppDispatch>();

  const ratings = ['G', 'PG', 'PG-13', 'R', 'R+', 'Rx'];

  const list = useSelector((state: RootState) => state.list);
  const allTags = list.status.concat(list.types, list.rating, list.genres);
  const onClickTag = (
    filter: 'genres' | 'status' | 'rating' | 'types',
    value: string,
  ) => {
    dispatch(removeTag({ filter: filter, value: value }));
  };
  const onClear = () => {
    dispatch(clearAll());
  };
  const tags = allTags.map((element) => (
    <div
      key={element.name}
      className={element.status ? 'tag' : 'tag discluded'}
      onClick={() => {
        onClickTag(element.filter, element.name);
      }}
    >
      {element.filter !== 'rating'
        ? element.name
        : ratings[parseInt(element.name)]}
      <Cross color={element.status ? 'white' : '#fd6161'} />
    </div>
  ));
  if (allTags.length > 0) {
    return (
      <>
        <div className={style.sortTitle}>
          Selected <span onClick={onClear}>clear all</span>
        </div>
        <div className={style.checkboxesWrapper}>
          <div className="tags">{tags}</div>
        </div>
      </>
    );
  }
  return null;
};

export default Tags;
