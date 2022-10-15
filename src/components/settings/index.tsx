import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { changeSettings } from '@/store/navigationState';


const Settings: React.FC = () => {
  const [anim, setAnim] = useState(false);
  const dispatcher = useDispatch<AppDispatch>();
  const settings = useSelector((state: RootState) => state.navigation.settings);

  return (
    <>
      {settings && (
        <div
          className={anim ? 'settings hide' : 'settings'}
          onClick={() => {
            setAnim(true);
          }}
          onAnimationEnd={() => {
            if(anim){
              setAnim(false);
              dispatcher(changeSettings(false));
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
