import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';

const container = document.getElementById('root');
const root = createRoot(container);

const App: React.FC = () => (
  <div>
    hi
  </div>
);

root.render(<App />);
