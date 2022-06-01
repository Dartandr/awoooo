import React from 'react';
import style from './index.module.scss';

const AnimePost: React.FC = () => {
  const posts = [
    {
      nickname: 'lawlmartz',
      date: '03/29/2015',
      avatar:
        'https://cdn.myanimelist.net/images/userimages/4277165.jpg?t=1551798000',
      link: 'null',
      content:
        ' "People do not live just so that they can someday die. It is because they are alive that they someday die." -Decim \n\nOverview:\n\n"Welcome to Quindecim", an ominous and deep voice states as the hiss of hydraulics release pressure and allow the cold steel doors to open. Two people step out. "Please, come have a seat here." The people have no memory of why or how they\'ve come to be at the Quindecim. "One, I cannot explain where you are, or how you came to be here. Two, we will now have you play a game. Three, we will have you select a game by roulette. read more\n\n',
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
  const post = posts.map((element, index) => (
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
  return <>{post}</>;
};

export default AnimePost;
