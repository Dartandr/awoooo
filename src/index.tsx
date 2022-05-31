import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import './index.scss';
import { store } from './store';
import Main from './main';

const container = document.getElementById('root');
const root = createRoot(container);

const App: React.FC = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

root.render(<App />);
