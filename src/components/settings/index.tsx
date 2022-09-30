import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '@/store';
import style from './index.module.scss';

const Settings: React.FC = () => {
  const [anim, setAnim] = useState(false);
  const navDispatcher = useDispatch<Dispatch>().navigation;
  const settings = useSelector((state: RootState) => state.navigation.settings);

  return (
    <>
      {settings && (
        <div
          className={anim ? `${style.settings} ${style.hide}` : style.settings}
          onClick={() => {
            setAnim(true);
          }}
          onAnimationEnd={() => {
            if(anim){
              setAnim(false);
              navDispatcher.setSettings(false);
            }
          }}
        >
          settings here
        </div>
      )}
    </>
  );
};

export default Settings;
