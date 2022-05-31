import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './navigation/navigation';
import style from './index.module.scss';

const Content: React.FC = () => {
  return (
    <div>
      <div className={style.app}>
        <Navigation />
        <Outlet />
      </div>
    </div>
  );
};

export default Content;
