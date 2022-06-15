import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { CSSTransition } from 'react-transition-group';
import "./settingsAnimation.scss";
import Navigation from './navigation/navigation';
import style from './index.module.scss';
import Player from '../pages/player';
import Settings from '../settings';

const Content: React.FC = () => {
  const settings = useSelector((state: RootState) => state.navigation.settings);
  return (
    <div>
      <div className={style.app} id="content">
        <Navigation />
        <Outlet />
        <Player />
        <CSSTransition
          in={settings}
          timeout={250}
          unmountOnExit
          classNames='settings'
        >
          <Settings />
        </CSSTransition>
      </div>
    </div>
  );
};

export default Content;
