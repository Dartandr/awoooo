import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import ReactMPV from './ReactMPV';
import style from './index.module.scss';
import {
  addDragListener,
  removeDragListener,
} from '@/components/helpers/dragElement';

interface IMPV {
  observe: (input: string) => void;
  command: (command: string, property: string | number | boolean) => void;
  property: (command: string, property: string | number | boolean) => void;
}
let mpv: IMPV;
const Player: React.FC = () => {
  const page = useSelector((state: RootState) => state.navigation.page);
  const showPlayer = useSelector((state: RootState) => state.player.showPlayer);
  const playerElement = document.getElementById('player');
  const prevPage = useRef(null);
  useEffect(() => {
    if (playerElement) {
      if (showPlayer === true && page === 'player') {
        playerElement.style.visibility = 'visible';
        playerElement.style.height = '100%';
        playerElement.style.width = 'calc(100vw - 200px)';
        playerElement.style.left = '200px';
        playerElement.style.top = '0px';
        removeDragListener(playerElement);
      } else if (prevPage.current === 'player' && showPlayer === true) {
        playerElement.style.height = '180px';
        playerElement.style.width = '320px';
        playerElement.style.left = '20px';
        playerElement.style.top = '20px';
        addDragListener(playerElement);
      }
    }
    prevPage.current = page;
  }, [page, showPlayer]);
  const [state, setState] = useState({ pause: true });
  const handleMPVReady = (mpvIn: IMPV): void => {
    mpv = mpvIn;
    mpv.observe('pause');
    mpv.observe('time-pos');
    mpv.command(
      'loadfile',
      'C:\\Users\\darta\\Desktop\\work\\awoooo\\src\\components\\pages\\player\\1.mkv',
    );
  };
  const togglePause = (): void => {
    mpv.property('pause', !state.pause);
    setState((prev) => ({ ...prev, pause: !prev.pause }));
  };
  const handlePropertyChange = (name: string, value: string) => {
    setState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={style.playerWrapper} id="player">
      <ReactMPV
        className="player"
        onReady={handleMPVReady}
        onPropertyChange={handlePropertyChange}
        onMouseDown={togglePause}
        borderRadius={page === 'player' ? '0px' : '15px'}
      />
    </div>
  );
};

export default Player;
