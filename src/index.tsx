/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Analysis from './pages/Analysis';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Global
      styles={css`
        * {
          font-family: 'Noto Sans' !important;
          user-select: none;
        }
      `}
    />
    <Analysis />
  </React.StrictMode>,
);
