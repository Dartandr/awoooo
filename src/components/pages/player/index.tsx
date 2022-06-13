import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import ReactMPV from './ReactMPV';
import style from './index.module.scss';
import {
  addDragListener,
  removeDragListener,
} from '@/components/helpers/dragElement';
import playIcon from '@/assets/icons/icon-player-play.svg';
import pauseIcon from '@/assets/icons/icon-player-pause.svg';
import fullscreenIcon from '@/assets/icons/icon-player-fullscreen.svg';
import notFullscreenIcon from '@/assets/icons/icon-player-not-fullscreen.svg';
import nextEpIcon from '@/assets/icons/icon-next-ep.svg';
import prevEpIcon from '@/assets/icons/icon-prev-ep.svg';
import volumeUpIcon from '@/assets/icons/icon-volume-up.svg';

interface IMPV {
  observe: (input: string) => void;
  command: (command: string, property: string | number | boolean) => void;
  property: (command: string, property: string | number | boolean) => void;
  keypress: (
    key: React.KeyboardEvent,
    shiftKey?: React.KeyboardEvent,
    ctrlKey?: React.KeyboardEvent,
    altKey?: React.KeyboardEvent,
  ) => void;
}
let mpv: IMPV;
const Player: React.FC = () => {
  const page = useSelector((state: RootState) => state.navigation.page);
  const showPlayer = useSelector((state: RootState) => state.player.showPlayer);
  const playerElement = document.getElementById('player');
  const root = document.getElementById('root');
  const prevPage = useRef(null);
  const playerPosition = useSelector(
    (state: RootState) => state.player.position,
  );
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
        playerElement.style.left = `${playerPosition.x}px`;
        playerElement.style.right = 'unset';
        playerElement.style.top = `${playerPosition.y}px`;
        playerElement.style.bottom = 'unset';
        addDragListener(playerElement);
      }
    }
    prevPage.current = page;
    if (page === 'player' && showPlayer) {
      document.addEventListener('mousemove', hideMouse);
    } else {
      const playerControls = document.getElementById('playerControls');
      clearTimeout(timerRef.current);
      root.style.cursor = 'default';
      playerControls.style.opacity = '1';
      playerControls.style.marginTop = '-50px';
      document.removeEventListener('mousemove', hideMouse);
    }
  }, [page, showPlayer]);
  const [state, setState] = useState({
    pause: true,
    'time-pos': '',
    duration: 0,
    seekerTime: '00:00',
    volume: 100,
  });
  let timer: ReturnType<typeof setTimeout> = null;
  const timerRef = useRef(timer);
  const onControl = useRef(false);
  const hideMouse = useCallback(() => {
    const playerControls = document.getElementById('playerControls');
    clearTimeout(timer);
    root.style.cursor = '';
    playerControls.style.opacity = '1';
    playerControls.style.marginTop = '-50px';
    timer = setTimeout(() => {
      if (!onControl.current) {
        root.style.cursor = 'none';
        playerControls.style.opacity = '0';
        playerControls.style.marginTop = '-47px';
      }
    }, 2000);
    timerRef.current = timer;
  }, []);
  const handleMPVReady = (mpvIn: IMPV): void => {
    mpv = mpvIn;
    mpv.observe('pause');
    mpv.observe('time-pos');
    mpv.observe('duration');
    mpv.observe('volume');
    mpv.command(
      'loadfile',
      'C:\\Users\\darta\\Desktop\\work\\awoooo\\src\\components\\pages\\player\\1.mkv',
    );
    mpv.property('volume', 110);
  };
  const togglePause = (): void => {
    mpv.property('pause', !state.pause);
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
  const [seekerTime, setSeekerTime] = useState('00:00');
  useEffect(() => {
    const seeker = document.getElementsByClassName(
      style.seeker,
    )[0] as HTMLElement;
    const seekerTime = document.getElementsByClassName(
      style.seekerTime,
    )[0] as HTMLElement;
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
      setSeekerTime(seekerTimer.toISOString().substring(14, 19));
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
      if (state.volume > 10) {
        mpv.property('volume', state.volume - 1);
      }
      if (state.volume === 11) {
        mpv.property('volume', 0);
      }
    } else {
      if (state.volume < 11) {
        mpv.property('volume', 11);
      } else {
        if (state.volume < 110) {
          mpv.property('volume', state.volume + 1);
        }
      }
    }
  };

  const [fullscreen, setFullscreen] = useState(false);

  const toggleFullscreen = (): void => {
    if (page === 'player') {
      playerElement.style.transition = 'unset';
      if (fullscreen) {
        document.exitFullscreen();
      } else {
        playerElement.requestFullscreen();
      }
      setFullscreen(!fullscreen);
    }
  };

  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      setFullscreen(false);
    }
  });

  useEffect(() => {
    if (playerElement && !fullscreen) {
      setTimeout(() => {
        playerElement.style.transition = 'all 300ms';
      }, 100);
    }
  }, [fullscreen]);

  const playerHandleKeyDown = (e: React.KeyboardEvent) => {
    e.preventDefault();
    if (showPlayer) {
      if (e.key === 'f') {
        toggleFullscreen();
      }
    }
  };

  return (
    <div
      className={style.playerWrapper}
      id="player"
      onWheel={onVolumeWheel}
      onKeyDown={playerHandleKeyDown}
      tabIndex={0}
    >
      <ReactMPV
        className="player"
        onReady={handleMPVReady}
        onPropertyChange={handlePropertyChange}
        radius={page === 'player' ? '0px' : '15px'}
      />
      <div
        className={style.hideCursor}
        onClick={page === 'player' ? togglePause : null}
      />
      <div
        className={style.controls}
        id="playerControls"
        onMouseEnter={() => {
          onControl.current = true;
        }}
        onMouseLeave={() => {
          onControl.current = false;
        }}
        style={
          page === 'player' ? { borderRadius: '0px' } : { borderRadius: '15px' }
        }
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
        {page === 'player' && (
          <>
            <div className={style.buttons}>
              <div className={style.controlsPrevEp}>
                <img src={prevEpIcon} alt="" />
              </div>
              <div className={style.controlsPlayPause}>
                <img src={state.pause ? playIcon : pauseIcon} alt="" />
              </div>
              <div className={style.controlsNextEp}>
                <img src={nextEpIcon} alt="" />
              </div>
              <div className={style.time}>
                {timerState.curTime} / {timerState.duration}
              </div>
              <div className={style.controlsSound}>
                <img src={volumeUpIcon} alt="" />
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
              <div className={style.controlsMaxMin} onClick={toggleFullscreen}>
                <img
                  src={fullscreen ? notFullscreenIcon : fullscreenIcon}
                  alt=""
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Player;
