import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
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
import Library from './components/pages/library';
import Friends from './components/pages/friends';
import { updateLibrary } from './store/libraryState';
import { getLocalLibrary } from './components/pages/library/libraryWork';

const Main: React.FC = () => {
  const UID = useSelector((state: RootState) => state.user.uid);
  const dispatcher = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      dispatcher(updateLibrary(await getLocalLibrary()));
    })();
  }, []);
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
      <HashRouter>
        <div className="App">
          <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route
              path="/"
              element={UID ? <Content /> : <Navigate replace to="/login" />}
            >
              <Route path="anime" element={<Animes />} />
              <Route path="anime/:animeId" element={<Anime />} />
              <Route path="profile" element={<Profile />} />
              <Route path="list" element={<List />} />
              <Route path="player" element={<Library />} />
              <Route path="friends" element={<Friends />} />
            </Route>
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
};

export default Main;
