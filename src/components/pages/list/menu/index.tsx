import React, { useEffect } from 'react';
import style from './index.module.scss';
import GenresComponent from './genres';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';

const ListMenu: React.FC = () => {
  const list = useSelector((state: RootState) => state.list);
  const dispatchList = useDispatch<Dispatch>().list;

  useEffect(() => {
    console.log(list.filters);
  }, [list.filters]);

  useEffect(() => {
    const checkboxes = document.querySelectorAll(
      'input[data-where="list"]',
    ) as NodeListOf<HTMLInputElement>;
    const onChange = (e: Event) => {
      const element = e.target as HTMLInputElement;
      const elementObject = {
        id: element.id,
        add: element.checked,
        checkBoxType: element.dataset.type
      };
      dispatchList.changeFilter(elementObject);
    };
    const isActive = (id: string): boolean => {
      return (
        list.filters.status.includes(id) ||
        list.filters.types.includes(id) ||
        list.filters.rating.includes(id) ||
        list.filters.genres.includes(id)
      );
    };
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = isActive(checkboxes[i].id);
      checkboxes[i].addEventListener('change', onChange);
    }
    return () => {
      for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].removeEventListener('change', onChange);
      }
    };
  }, []);
  return (
    <div className={style.wrapper}>
      <div className={style.sorting}>
        <div className={style.sortTitle}>Status</div>
        <div className={style.checkboxesWrapper}>
          <div className={style.checkbox}>
            <input
              className={style.customCheckbox}
              id="Completed"
              name="type"
              type="checkbox"
              data-where="list"
              data-type="status"
            />
            <label htmlFor="Completed">Completed</label>
          </div>
          <div className={`${style.checkbox}`}>
            <input
              className={style.customCheckbox}
              id="PTW"
              name="type"
              type="checkbox"
              data-where="list"
              data-type="status"
            />
            <label htmlFor="PTW">Planned to Watch</label>
          </div>
          <div className={style.checkbox}>
            <input
              className={style.customCheckbox}
              id="Watching"
              name="type"
              type="checkbox"
              data-where="list"
              data-type="status"
            />
            <label htmlFor="Watching">Watching</label>
          </div>
          <div className={style.checkbox}>
            <input
              className={style.customCheckbox}
              id="OnHold"
              name="type"
              type="checkbox"
              data-where="list"
              data-type="status"
            />
            <label htmlFor="OnHold">On hold</label>
          </div>
          <div className={style.checkbox}>
            <input
              className={style.customCheckbox}
              id="Dropped"
              name="type"
              type="checkbox"
              data-where="list"
              data-type="status"
            />
            <label htmlFor="Dropped">Dropped</label>
          </div>
        </div>
        <div className={style.spacingline}></div>
        <div className={style.sortTitle}>Type</div>
        <div className={style.checkboxesWrapper}>
          <div className={style.checkbox}>
            <input
              className={style.customCheckbox}
              id="TV"
              name="type"
              type="checkbox"
              data-where="list"
              data-type="type"
            />
            <label htmlFor="TV">TV Series</label>
          </div>
          <div className={style.checkbox}>
            <input
              className={style.customCheckbox}
              id="Movie"
              name="type"
              type="checkbox"
              data-where="list"
              data-type="type"
            />
            <label htmlFor="Movie">Movie</label>
          </div>
          <div className={style.checkbox}>
            <input
              className={style.customCheckbox}
              id="ONA"
              name="type"
              type="checkbox"
              data-where="list"
              data-type="type"
            />
            <label htmlFor="ONA">ONA</label>
          </div>
          <div className={style.checkbox}>
            <input
              className={style.customCheckbox}
              id="OVA"
              name="type"
              type="checkbox"
              data-where="list"
              data-type="type"
            />
            <label htmlFor="OVA">OVA</label>
          </div>
          <div className={style.checkbox}>
            <input
              className={style.customCheckbox}
              id="Special"
              name="type"
              type="checkbox"
              data-where="list"
              data-type="type"
            />
            <label htmlFor="Special">Specials</label>
          </div>
        </div>
        <div className={style.spacingline}></div>
        <div className={style.sortTitle}>Rating</div>
        <div className={style.checkboxesWrapper}>
          <div className={style.checkbox}>
            <input
              className={style.customCheckbox}
              id="0"
              name="rating"
              type="checkbox"
              data-where="list"
              data-type="rating"
            />
            <label htmlFor="0">G</label>
          </div>
          <div className={style.checkbox}>
            <input
              className={style.customCheckbox}
              id="1"
              name="rating"
              type="checkbox"
              data-where="list"
              data-type="rating"
            />
            <label htmlFor="1">PG</label>
          </div>
          <div className={style.checkbox}>
            <input
              className={style.customCheckbox}
              id="2"
              name="rating"
              type="checkbox"
              data-where="list"
              data-type="rating"
            />
            <label htmlFor="2">PG-13</label>
          </div>
          <div className={style.checkbox}>
            <input
              className={style.customCheckbox}
              id="3"
              name="rating"
              type="checkbox"
              data-where="list"
              data-type="rating"
            />
            <label htmlFor="3">R</label>
          </div>
          <div className={style.checkbox}>
            <input
              className={style.customCheckbox}
              id="4"
              name="rating"
              type="checkbox"
              data-where="list"
              data-type="rating"
            />
            <label htmlFor="4">R+</label>
          </div>
          <div className={style.checkbox}>
            <input
              className={style.customCheckbox}
              id="5"
              name="rating"
              type="checkbox"
              data-where="list"
              data-type="rating"
            />
            <label htmlFor="5">Rx</label>
          </div>
        </div>
        <div className={style.spacingline}></div>
        <div className={style.sortTitle}>Genres</div>
        <div className={style.checkboxesWrapper}>
          <GenresComponent />
        </div>
      </div>
    </div>
  );
};

export default ListMenu;
