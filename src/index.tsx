import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import { Setting } from '../src/const/const';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offersCount={Setting.offersCount}/>
  </React.StrictMode>
);
