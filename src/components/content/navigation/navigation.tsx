import React from 'react';
import style from './navigation.module.scss';
import { NavLink } from 'react-router-dom';
import settingsIcon from '@/assets/icons/icon-settings.svg';
import messageIcon from '@/assets/icons/icon-message.svg';
import homeIcon from '@/assets/icons/icon-home.svg';
import profileIcon from '@/assets/icons/icon-profile.svg';
import listIcon from '@/assets/icons/icon-list.svg';
import playerIcon from '@/assets/icons/icon-player.svg';

const Navigation: React.FC = () => {
  return (
    <div className={style.nav}>
      <div className={style.navitem}>
        <NavLink
          to={'/anime'}
          className={({ isActive }) => (isActive ? style.active : '')}
        >
          <div className={style.item}>
            <img src={homeIcon} alt="home" /> Anime
          </div>
        </NavLink>
      </div>

      <div className={style.navitem}>
        <NavLink
          to={'/profile'}
          className={({ isActive }) => (isActive ? style.active : '')}
        >
          <div className={style.item}>
            <img src={profileIcon} alt="profile" /> Profile
          </div>
        </NavLink>
      </div>

      <div className={style.navitem}>
        <NavLink
          to={'/list'}
          className={({ isActive }) => (isActive ? style.active : '')}
        >
          <div className={style.item}>
            <img src={listIcon} alt="list" /> List
          </div>
        </NavLink>
      </div>

      <div className={style.navitem}>
        <NavLink
          to={'/player'}
          className={({ isActive }) => (isActive ? style.active : '')}
        >
          <div className={style.item}>
            <img src={playerIcon} alt="list" />
            Player
          </div>
        </NavLink>
      </div>
      <div className={style.friends}>
        <div className={style.navitem}>
          <NavLink to={'/friends'}>Friends</NavLink>
        </div>
      </div>

      <div className={style.Settings}>
        <img src={settingsIcon} alt="" />
      </div>
      <div className={style.messageNav}>
        <div className={style.messageDot} />
        <img
          src={messageIcon}
          onClick={() => {
            alert('test');
          }}
        />
      </div>
    </div>
  );
};

export default Navigation;