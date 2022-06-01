import React from 'react';
import style from './index.module.scss';

const ProfilePost: React.FC = () => {
  const posts = [
    {
      nickname: 'Kerli',
      date: '10/20/2019',
      avatar:
        'https://cdn.discordapp.com/attachments/543797108973633557/635431665560190986/IMG_20191020_175825_184.jpg',
      link: 'null',
      content:
        "Joho, \n\nSo you're watching Gintama that's great. \n\nWell let me give you an advice.\nJust for your information.\n\nThe first Episodes and following few Episodes can be quite average.\nI know that it can be for many people, so maybe for you as well.\n\nBut it will improve a lot afterwards.\nSo I hope you will keep on watching Gintama ",
    },
    {
      nickname: 'Akuma',
      date: '10/20/2019',
      avatar:
        'https://cdn.discordapp.com/attachments/543797108973633557/635434169438044162/IMG_20191020_180814_543.jpg',
      link: 'null',
      content: 'hello',
    },
    {
      nickname: 'TestUser',
      date: '10/20/2019',
      avatar:
        'https://cdn.discordapp.com/attachments/543797108973633557/635434298446577665/IMG_20191020_180851_192.jpg',
      link: 'null',
      content: 'test text',
    },
  ];
  const postsElement = posts.map((element, index) => (
    <div className={style.wrapper} key={index}>
      <div className={style.content}>
        <div className={style.avatar}>
          <img src={element.avatar} alt="avatar" />
        </div>
        <div>
          <div className={style.nickName}>{element.nickname}</div>
          <div className={style.postDate}>{element.date}</div>
        </div>
        <div className={style.postContent}>{element.content}</div>
      </div>
    </div>
  ));
  return <>{postsElement}</>;
};

export default ProfilePost;
