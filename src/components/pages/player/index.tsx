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
        playerElement.style.left = '200px';
        playerElement.style.right = '0';
        playerElement.style.top = '66px';
        playerElement.style.bottom = '46px';
        playerElement.style.height = 'unset';
        playerElement.style.width = 'unset';
        removeDragListener(playerElement);
      } else if (prevPage.current === 'player' && showPlayer === true) {
        playerElement.style.height = '180px';
        playerElement.style.width = '320px';
        playerElement.style.left = '20px';
        playerElement.style.right = 'unset';
        playerElement.style.top = '20px';
        playerElement.style.bottom = 'unset';
        addDragListener(playerElement);
      }
    }
    prevPage.current = page;
  }, [page, showPlayer]);
  const [state, setState] = useState({
    pause: true,
    'time-pos': '',
    duration: 0,
    seekerTime: '00:00',
    volume: 100,
  });
  const handleMPVReady = (mpvIn: IMPV): void => {
    mpv = mpvIn;
    mpv.observe('pause');
    mpv.observe('time-pos');
    mpv.observe('duration');
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

  const handleSeek = (e: React.MouseEvent): void => {
    e.stopPropagation();
    const seekerRect = document
      .getElementsByClassName(style.seeker)[0]
      .getBoundingClientRect();
    const offset = e.clientX - seekerRect.left;
    const step = state.duration / seekerRect.width;
    const time = Math.round(step * offset);
    mpv.property('time-pos', time);
  };

  const seekerProgress = (): void => {
    const scroller = document.getElementsByClassName(
      style.seekerProgress,
    )[0] as HTMLElement;
    const pointer = document.getElementsByClassName(
      style.seekerPointer,
    )[0] as HTMLElement;
    if (scroller) {
      const width = document
        .getElementsByClassName(style.seeker)[0]
        .getBoundingClientRect().width;
      const step = width / state.duration;
      pointer.style.left = `${Number(state['time-pos']) * step}px`;
      const progress = (Number(state['time-pos']) * 100) / state.duration;
      scroller.style.width = progress + '%';
    }
  };
  const [seekerTime, setSeekerTime] = useState("00:00")
  useEffect(() => {
    const seeker = document.getElementsByClassName(style.seeker)[0] as HTMLElement;
    const seekerTime = document.getElementsByClassName(style.seekerTime)[0] as HTMLElement;
    const seekerProgressTime = document.getElementsByClassName(
      style.seekerProgressSelect,
    )[0] as HTMLElement;
    seeker.addEventListener('mousemove', (event) => {
      const seekerRect = seeker.getBoundingClientRect();
      const seekerTimeWidth = seekerTime.getBoundingClientRect().width / 2;
      let x = 0;
      const offset = event.clientX - seekerRect.left;
      if (offset > seekerTimeWidth) {
        if (seekerRect.width - offset > seekerTimeWidth) {
          x = offset - seekerTimeWidth;
        } else {
          x = seekerRect.width - seekerTimeWidth * 2;
        }
      }
      seekerTime.style.transform = `translateX(${x}px)`;
      seekerProgressTime.style.width = `${event.clientX - seekerRect.left}px`;
      const step = state.duration / seekerRect.width;
      const time = step * offset;
      const seekerTimer = new Date(null);
      seekerTimer.setSeconds(Math.round(time));
      setSeekerTime(seekerTimer.toISOString().substring(14, 19))
    });
  }, [state.duration]);

  const [timerState, setTimerState] = useState({ duration: '', curTime: '' });
  useEffect(() => {
    const duration = new Date(null);
    duration.setSeconds(Math.round(state.duration));
    setTimerState((prev) => ({
      ...prev,
      duration: duration.toISOString().substring(14, 19),
    }));
  }, [state.duration]);
  useEffect(() => {
    const curTime = new Date(null);
    curTime.setSeconds(Math.round(Number(state['time-pos'])));
    setTimerState((prev) => ({
      ...prev,
      curTime: curTime.toISOString().substring(14, 19),
    }));
    seekerProgress();
  }, [state['time-pos']]);
  const onVolumeWheel = (event: React.WheelEvent) => {
      if (event.deltaY > 0) {
        if (state.volume > 0) {
          setState((prev) => ({ ...prev, volume: prev.volume -1 }));
        }
    } else {
        if (state.volume < 100) {
          setState((prev) => ({ ...prev, volume: prev.volume +1 }));
        }
    }
    mpv.property("ao-volume", state.volume);
  };

  return (
    <div className={style.playerWrapper} id="player" onWheel={onVolumeWheel}>
      <ReactMPV
        className="player"
        onReady={handleMPVReady}
        onPropertyChange={handlePropertyChange}
        radius={page === 'player' ? '0px' : '15px'}
      />
      <div className={style.hideCursor} onClick={togglePause} />
      <div
        className={style.controls}
        id="playerControls"
        onMouseEnter={() => {
          console.log('mouseEnter');
        }}
        onMouseLeave={() => {
          console.log('mouseLeave');
        }}
        style={page === 'player'?{borderRadius:'0px'}:{borderRadius:'15px'}}
      >
        <div
          className={style.seeker}
          onMouseUp={(event) => {
            handleSeek(event);
          }}
        >
          <div className={style.seekerProgressSelect} />
          <div className={style.seekerProgress} />
          <div className={style.seekerPointer} />
          <div className={style.seekerTime}>{seekerTime}</div>
        </div>
        <div className={style.buttons}>
          <div className={style.controlsPrevEp}>
            <img src={''} alt="" />
          </div>
          <div className={style.controlsPlayPause}>
            <img src={''} alt="" />
          </div>
          <div className={style.controlsNextEp}>
            <img src={''} alt="" />
          </div>
          <div className={style.time}>
            {timerState.curTime} / {timerState.duration}
          </div>
          <div className={style.controlsSound}>
            <img src={''} alt="" />
          </div>
        </div>
        <div className={style.buttonsRight}>
          <div className={style.controlsAudioTrack}>
            <img src={''} alt="" />
          </div>
          <div
            className={style.controlsSubs}
            onClick={() => {
              console.log('getsubs');
            }}
          >
            <img src={''} alt="" />
          </div>
          <div className={style.controlsMaxMin}>
            <img src={''} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
