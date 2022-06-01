import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IconMaximize from '@/assets/icons/icon-maximize.svg';
import IconMinimize from '@/assets/icons/icon-minimize.svg';
import IconCross from '@/assets/icons/icon-cross.svg';
import windowManagment from './electronControls';
import LoginPage from './components/login';
import Content from './components/content';
import Animes from './components/pages/animes';
import Anime from './components/pages/anime';
import Profile from './components/pages/profile';
import List from './components/pages/list';
import Player from './components/pages/player';

const Main: React.FC = () => {
  return (
    <div className="wrapper">
      <header>
        <span>AWOOOO</span>
        <nav>
          <ul>
            <li>
              <div id="min-btn">
                <img src={IconMinimize} alt="minimize" />
              </div>
            </li>
            <li>
              <div id="max-btn">
                <img src={IconMaximize} alt="maximize" />
              </div>
            </li>
            <li>
              <div id="close-btn">
                <img src={IconCross} alt="close" onLoad={windowManagment} />
              </div>
            </li>
          </ul>
        </nav>
      </header>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="/" element={<Content />}>
              <Route path="anime" element={<Animes />} />
              <Route path="anime/:animeId" element={<Anime />} />
              <Route path="profile" element={<Profile />} />
              <Route path="list" element={<List />} />
              <Route path="player" element={<Player />} />
              <Route path="friends" element={<div>friends</div>} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default Main;
