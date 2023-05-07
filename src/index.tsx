/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './index.css';
import Analysis from './pages/Analysis';
import Recommend from './pages/Recommend';

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
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path='/analysis' element={<Analysis />} />
          <Route path='/recommend' element={<Recommend />} />
          <Route path='*' element={<Navigate to='/analysis' replace />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
);
