import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import './index.scss';
import { store } from './store';
import MyElement from './myElement';

const container = document.getElementById('root');
const root = createRoot(container);

const App: React.FC = () => (
  <Provider store={store}>
    <MyElement/>
  </Provider>
);

root.render(<App />);
