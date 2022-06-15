import React from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@/store';
import style from './index.module.scss';

const Settings: React.FC = () => {
  const navDispatcher = useDispatch<Dispatch>().navigation;

  return (
    <div className={style.settings}>
      <div
        onClick={() => {
          navDispatcher.setSettings(false);
        }}
      >
        settings here
      </div>
    </div>
  );
};

export default Settings;
