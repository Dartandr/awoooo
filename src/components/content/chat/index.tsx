import React, { useState } from 'react';
const path = window.require('path');
const ipc = window.require('electron').ipcRenderer;
import { NavLink } from 'react-router-dom';
import style from './index.module.scss';
import IconMaximize from '@/assets/icons/icon-maximize.svg';
import IconMinimize from '@/assets/icons/icon-minimize.svg';
import IconCross from '@/assets/icons/icon-cross.svg';
import IconAddChat from '@/assets/icons/icon-add-friend.svg';
import IconSendMessage from '@/assets/icons/icon-send-message.svg';
import IconChatDots from '@/assets/icons/icon-chat-dots.svg';
import IconPlug from '@/assets/icons/icon-empty-logo.svg';

const chatElements: Array<IDialog> = [
  {
    id: 4,
    name: 'BlackShark',
    img: 'https://cdn.discordapp.com/avatars/183964506165215232/ab9ca8b0eaa3f95ebc77d42ef1b2705b.png?size=512',
  },
];

const messageElements: Array<IMessage> = [
  {
    name: '1',
    type: 'anime',
    data: {
      id: 1,
      title: 'Anime Name',
      score: 8.13,
      type: 'Special',
      episodes: 2,
      poster:
        'https://cdn.discordapp.com/avatars/183964506165215232/ab9ca8b0eaa3f95ebc77d42ef1b2705b.png?size=512',
    },
  },
  {
    name: 'BlackShark',
    content: 'hello',
  },
];

interface IMessageData {
  id?: number;
  poster?: string;
  title?: string;
  score?: number;
  type?: string;
  episodes?: number;
}

interface IMessage {
  name: string;
  type?: string;
  data?: IMessageData;
  content?: string;
}

interface IDialog {
  id: number;
  name: string;
  img: string;
}

interface IProps {
  path: string | null;
  body: Document;
}

const Chat: React.FC<IProps> = (props: IProps) => {
  const iconsPath = (icon: string): string => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      return `http://localhost:3020${icon}`;
    } else {
      return `file://${path.join(props.path, icon)}`;
    }
  };

  const onKeyPress = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSendClick();
    }
  };

  //TODO on message scroll bottom
  // componentDidUpdate() {
  //     if (this.props.body !== "") {
  //         let messagesScroll = this.props.body.getElementsByClassName(
  //             style.messages
  //         )[0];
  //         if (messagesScroll !== undefined) {
  //             messagesScroll.scrollTop =
  //                 messagesScroll.scrollHeight - messagesScroll.clientHeight;
  //         }
  //     }
  // }

  const [dialog, setDialog] = useState({ id: null, name: null, img: null });

  const onDialogClick = (element: IDialog) => {
    setDialog(element);
  };

  const dialogs = () => {
    const chat = chatElements.map((element) => (
      <div
        id={element.id.toString()}
        key={element.id}
        className={
          element.id === dialog.id
            ? `${style.chatSelect} ${style.chatSelected}`
            : style.chatSelect
        }
        onClick={() => {
          console.log('test');
          onDialogClick(element);
        }}
      >
        <img src={element.img} alt="" />
      </div>
    ));
    return chat;
  };

  const messages = (): Array<JSX.Element> => {
    const messages = messageElements.map((message, id) => (
      <div key={id}>
        {message.type == 'anime' && (
          <NavLink
            to={'/anime/' + message.data.id}
            onClick={() => {
              console.log('go to anime');
            }}
          >
            <div
              key={id}
              className={`${style.plashka} ${
                message.name === '1' ? style.plashkaMe : style.plashkaAnother
              }`}
            >
              <div className={style.plashkaPoster}>
                <img src={message.data.poster} alt="" />
              </div>
              <div className={style.plashkaContent}>
                <div className={style.plashkaTitle}>
                  {message.data.title.length < 23
                    ? message.data.title
                    : message.data.title.slice(0, 22) + '...'}
                </div>
                <div className={style.plashkaLine}>
                  Score: {message.data.score}
                </div>
                <div className={style.plashkaLine}>
                  Type: {message.data.type}
                </div>
                <div className={style.plashkaLine}>
                  Episodes: {message.data.episodes}
                </div>
              </div>
            </div>
          </NavLink>
        )}
        {message.type === undefined && (
          <div
            key={id}
            className={`${style.message} ${
              message.name === '1'
                ? style.messageFromMe
                : style.messageFromAnother
            }`}
          >
            <div className={style.messageContent}>{message.content}</div>
          </div>
        )}
      </div>
    ));
    return messages;
  };

  const onSendClick = () => {
    const input = props.body.getElementById('messageInput') as HTMLInputElement;
    console.log(input.value);
    input.value = '';
  };
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div className={style.headerLogo}>AWOOOO</div>
        <div className={style.buttons}>
          <div
            className={style.button}
            onClick={() => {
              ipc.send('min');
            }}
          >
            <img src={iconsPath(IconMinimize)} alt="minimize" />
          </div>
          <div
            className={style.button}
            onClick={() => {
              ipc.send('max');
            }}
          >
            <img src={iconsPath(IconMaximize)} alt="maximize" />
          </div>
          <div
            className={style.buttonClose}
            onClick={() => {
              ipc.send('close');
            }}
          >
            <img src={iconsPath(IconCross)} alt="close" />
          </div>
        </div>
      </div>
      <div className={style.content}>
        <div className={style.navigation}>
          <div className={style.chats}>{dialogs()}</div>
          <div className={style.addChat}>
            <img src={iconsPath(IconAddChat)} alt="" />
          </div>
        </div>
        <div className={style.main}>
          <div className={style.mainHeader}>
            <div className={style.name}>
              {dialog.name ? dialog.name : 'Chat'}
            </div>
            {dialog.id && (
              <div className={style.chatActions}>
                <img src={iconsPath(IconChatDots)} alt="" />
              </div>
            )}
          </div>
          <div className={style.spacerLine} />
          {!dialog.id && (
            <div className={style.plug}>
              <div className={style.content}>
                <img src={iconsPath(IconPlug)} alt="" />
                <div className={style.text}>Open a dialog</div>
              </div>
            </div>
          )}
          {dialog.id && (
            <div className={style.messagesArea}>
              <div className={style.messages}>{messages()}</div>
              <div className={style.input}>
                <textarea
                  spellCheck="false"
                  placeholder={'Message'}
                  id="messageInput"
                  onKeyDown={onKeyPress}
                />
                <div className={style.sendButton} onClick={onSendClick}>
                  <img src={iconsPath(IconSendMessage)} alt="" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
