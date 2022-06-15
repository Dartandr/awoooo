import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { Dispatch, RootState } from '@/store';
import style from './index.module.scss';
import './settingsAnimation.scss';
const Settings: React.FC = () => {
  const navDispatcher = useDispatch<Dispatch>().navigation;
  const settings = useSelector((state: RootState) => state.navigation.settings);

  return (
    <CSSTransition
      in={settings}
      timeout={250}
      unmountOnExit
      classNames="settings"
    >
      <div className={style.settings}>
        <div
          onClick={() => {
            navDispatcher.setSettings(false);
          }}
        >
          settings here
        </div>
      </div>
    </CSSTransition>
  );
};

export default Settings;
