import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import style from './navigation.module.scss';
import { NavLink } from 'react-router-dom';
const ipc = window.require('electron').ipcRenderer;
import Chat from '../chat';
import copyStyles from '@/components/helpers/copyStyles';
import settingsIcon from '@/assets/icons/icon-settings.svg';
import messageIcon from '@/assets/icons/icon-message.svg';
import homeIcon from '@/assets/icons/icon-home.svg';
import profileIcon from '@/assets/icons/icon-profile.svg';
import listIcon from '@/assets/icons/icon-list.svg';
import playerIcon from '@/assets/icons/icon-player.svg';
import { changePage, changeSettings } from '@/store/navigationState';

let path: string | null = null;
(async () => {
  const result = await ipc.invoke('path');
  path = result;
})();

interface ChatProps {
  onCloseChat: () => void;
  passWindow: (e: Window) => void;
}

const ChatWindow: React.FC<ChatProps> = ({ onCloseChat, passWindow }) => {
  const chatDocument = window.open('');
  const timer = setInterval(function () {
    if (chatDocument.closed) {
      clearInterval(timer);
      onCloseChat();
    }
  }, 200);
  useEffect(() => {
    passWindow(chatDocument)
    copyStyles(document, chatDocument.document);
  }, []);
  return ReactDOM.createPortal(
    <Chat closeChat={onCloseChat} path={path} body={chatDocument.document} />,
    chatDocument.document.body,
  );
};

const Navigation: React.FC = () => {
  const [showChat, setShowChat] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const onChangePage = (page: string) => {
    dispatch(changePage(page));
  };
  const onCloseChat = (): void => {
    setShowChat(false);
  };
  let chatWindow: null | Window = null;
  const setChatWindow = (e: Window): void =>{
    chatWindow = e
  }
  return (
    <div className={style.nav}>
      {showChat && (
        <ChatWindow passWindow={setChatWindow} onCloseChat={onCloseChat} />
      )}
      <div className={style.navitem}>
        <NavLink
          to={'/anime'}
          className={({ isActive }) => (isActive ? style.active : '')}
          onClick={() => {
            onChangePage('anime');
          }}
        >
          <div className={style.item}>
            <img src={homeIcon} alt="home" /> Anime
          </div>
        </NavLink>
      </div>

      <div className={style.navitem}>
        <NavLink
          to={'/profile'}
          className={({ isActive }) => (isActive ? style.active : '')}
          onClick={() => {
            onChangePage('profile');
          }}
        >
          <div className={style.item}>
            <img src={profileIcon} alt="profile" /> Profile
          </div>
        </NavLink>
      </div>

      <div className={style.navitem}>
        <NavLink
          to={'/list'}
          className={({ isActive }) => (isActive ? style.active : '')}
          onClick={() => {
            onChangePage('list');
          }}
        >
          <div className={style.item}>
            <img src={listIcon} alt="list" /> List
          </div>
        </NavLink>
      </div>

      <div className={style.navitem}>
        <NavLink
          to={'/player'}
          className={({ isActive }) => (isActive ? style.active : '')}
          onClick={() => {
            onChangePage('player');
          }}
        >
          <div className={style.item}>
            <img src={playerIcon} alt="list" />
            Player
          </div>
        </NavLink>
      </div>
      <div className={style.friends}>
        <div className={style.navitem}>
          <NavLink
            to={'/friends'}
            onClick={() => {
              onChangePage('friends');
            }}
          >
            Friends
          </NavLink>
        </div>
      </div>
      <div
        className={style.Settings}
        onClick={() => {
          dispatch(changeSettings(true));
        }}
      >
        <img src={settingsIcon} alt="" />
      </div>
      <div className={style.messageNav}>
        <div className={style.messageDot} />
        <img
          src={messageIcon}
          onClick={() => {
            setShowChat(true);
            if (chatWindow) {
              ipc.send('show');
            }
          }}
        />
      </div>
    </div>
  );
};

export default Navigation;
