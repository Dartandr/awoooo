import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './navigation/navigation';
import style from './index.module.scss';
import Player from '../pages/player';
import Settings from '../settings';

const Content: React.FC = () => {

  return (
    <div>
      <div className={style.app} id="content">
        <Navigation />
        <Outlet />
        <Player />
        <Settings />
      </div>
    </div>
  );
};

export default Content;
