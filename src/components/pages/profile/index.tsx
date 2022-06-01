import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './index.module.scss';
import Activities from './activities/';
import addFriendIcon from '@/assets/icons/icon-add-friend.svg';
import blockIcon from '@/assets/icons/icon-block-user.svg';
import messageIcon from '@/assets/icons/icon-message.svg';
import ProfilePost from './post/';
import scrollProgressBar from '../../helpers/scrollProgressBar';

const activities = [
  {
    title: 'Fullmetal Alchemist',
    action: 'Completed',
    rate: 'Rated 10',
    img: 'https://cdn.myanimelist.net/images/anime/1223/96541.jpg',
  },
  {
    title: 'Steins;Gate',
    action: 'Watching',
    eps: 'Episode #8',
    img: 'https://cdn.myanimelist.net/images/anime/5/73199.jpg',
  },
  {
    title: 'Hunter x Hunter',
    action: 'Added to list',
    img: 'https://cdn.myanimelist.net/images/anime/11/33657.jpg',
  },
];

const friendsElements = [
  {
    id: 1,
    img: 'https://cdn.discordapp.com/attachments/530940222771560452/805854676360495154/Group_8.png',
  },
  {
    id: 2,
    img: 'https://cdn.discordapp.com/attachments/530940222771560452/805854678398402560/Group_9.png',
  },
  {
    id: 3,
    img: 'https://cdn.discordapp.com/attachments/530940222771560452/805854679476338758/Group_10.png',
  },
  {
    id: 4,
    img: 'https://cdn.discordapp.com/attachments/530940222771560452/805854682157285436/Group_12.png',
  },
  {
    id: 5,
    img: 'https://cdn.discordapp.com/attachments/530940222771560452/805854683586887690/Group_13.png',
  },
  {
    id: 6,
    img: 'https://cdn.discordapp.com/attachments/530940222771560452/805854685029203978/Group_15.png',
  },
  {
    id: 7,
    img: 'https://cdn.discordapp.com/attachments/530940222771560452/805854681057460265/Group_11.png',
  },
];
const list = {
  completed: 393,
  ptw: 83,
  watching: 2,
};

const Profile: React.FC = () => {
  const friends = (): Array<JSX.Element> => {
    const friends = friendsElements.map((friend) => (
      <div className={style.friend} key={friend.id}>
        <img src={friend.img} alt="" />
      </div>
    ));
    return friends;
  };

  const progressBar = (): void => {
    const progress = document.getElementsByClassName(
      style.scrollbar,
    ) as HTMLCollectionOf<HTMLElement>;
    const scrollElement = document.getElementsByClassName(
      style.scrollableContent,
    ) as HTMLCollectionOf<HTMLElement>;
    scrollProgressBar(progress[0], scrollElement[0]);
  };

  const onAddFriendClick = (): void => {
    alert('friend Added');
  };

  const onMessageClick = (): void => {
    alert('chat opened');
  };

  const onBlockClick = (): void => {
    alert('user blocked');
  };

  return (
    <div className={style.wrapper}>
      <div className={style.scrollbar} />
      <div className={style.content}>
        <div className={style.profileInfo}>
          <div className={style.avatar}>
            <img
              src="https://cdn.discordapp.com/attachments/543797108973633557/583663720354545674/2019-05-13_23-07-13_0.png"
              alt="avatar"
            />
          </div>
          <div className={style.profileData}>
            <div className={style.nickname}>Dartandr</div>
            <div className={style.status}>Creator</div>
            <div className={style.additionalInfo}>
              Andrew | male | 21 yo | Here since the beginning
            </div>
            <div className={style.listsLinks}>
              <img
                src="https://avatars.githubusercontent.com/u/7648832?s=280&v=4"
                alt="kitsu"
              />
              <img
                src="https://cdn.discordapp.com/attachments/573902204482879498/630823159653859341/unknown.png"
                alt="shikimori"
              />
            </div>
          </div>
        </div>
        <div className={style.rightColumn}>
          <div className={style.lastActivities}>
            <div className={style.lastActivitiesTitle}>Activities</div>
            <div className={style.lastActivitiesContent}>
              <Activities activities={activities} />
            </div>
          </div>
          <div className={style.friends}>
            <div className={style.friendsTitle}>Friends</div>
            <div className={style.friendsContent}>{friends()}</div>
          </div>
        </div>
        <div className={style.profileButtons}>
          <img src={addFriendIcon} alt="" onClick={onAddFriendClick} />
          <img src={messageIcon} alt="" onClick={onMessageClick} />
          <img src={blockIcon} alt="" onClick={onBlockClick} />
        </div>
        <div className={style.scrollableContent} onScroll={progressBar}>
          <div className={style.animelist}>
            <NavLink to="/list">
              <div className={style.animeListColumn}>
                <div className={style.animeListColumnValue}>
                  {list.completed}
                </div>
                <div className={style.animeListColumnTitle}>Completed</div>
              </div>
            </NavLink>
            <NavLink to="/list">
              <div className={style.animeListColumn}>
                <div className={style.animeListColumnValue}>{list.ptw}</div>
                <div className={style.animeListColumnTitle}>
                  Planned to Watch
                </div>
              </div>
            </NavLink>
            <NavLink to="/list">
              <div className={style.animeListColumn}>
                <div className={style.animeListColumnValue}>
                  {list.watching}
                </div>
                <div className={style.animeListColumnTitle}>Watching</div>
              </div>
            </NavLink>
          </div>
          <div className={style.characters}>
            <div className={style.charactersTitle}>Favorites</div>
            <div className={style.charactersContentWrapper}>
              <div className={style.charactersContent}>
                <img
                  src="https://cdn.myanimelist.net/images/anime/1223/96541.jpg"
                  alt="img"
                />
                <img
                  src="https://cdn.myanimelist.net/images/anime/1000/110531.jpg"
                  alt="img"
                />
                <img
                  src="https://cdn.myanimelist.net/images/anime/5/73199.jpg"
                  alt="img"
                />
                <img
                  src="https://cdn.myanimelist.net/images/anime/1517/100633.jpg"
                  alt="img"
                />
                <img
                  src="https://cdn.myanimelist.net/images/anime/3/72078.jpg"
                  alt="img"
                />
                <img
                  src="https://cdn.myanimelist.net/images/anime/13/13225.jpg"
                  alt="img"
                />
                <img
                  src="https://cdn.myanimelist.net/images/anime/10/73274.jpg"
                  alt="img"
                />
                <img
                  src="https://cdn.myanimelist.net/images/anime/10/51723.jpg"
                  alt="img"
                />
              </div>
            </div>
          </div>
          <ProfilePost />
        </div>
      </div>
    </div>
  );
};

export default Profile;
