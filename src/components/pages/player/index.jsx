import React, { useState } from 'react';
import ReactMPV from './ReactMPV';

let mpv;
const Player = () => {
  const [state, setState] = useState({});
  const handleMPVReady = (mpvIn) => {
    mpv = mpvIn;
    mpv.observe('pause');
    mpv.observe('time-pos');
    mpv.command(
      'loadfile',
      'C:\\Users\\darta\\Desktop\\work\\awoooo\\src\\components\\pages\\player\\1.mkv',
    );
  };
  const togglePause = () => {
    mpv.property('pause', !state.pause);
    setState((prev) => ({ ...prev, pause: !prev.pause }));
  };
  const handlePropertyChange = (name, value) => {
    setState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <ReactMPV
        className="player"
        onReady={handleMPVReady}
        onPropertyChange={handlePropertyChange}
        onMouseDown={togglePause}
      />
    </>
  );
};

export default Player;
