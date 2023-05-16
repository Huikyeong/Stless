/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react';
import Onboarding from 'pages/Onboarding';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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
    <DndProvider backend={HTML5Backend}>
      <RecoilRoot>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path='/analysis' element={<Analysis />} />
            <Route path='/recommend' element={<Recommend />} />
            <Route path='/onboard' element={<Onboarding />} />
            <Route path='*' element={<Navigate to='/analysis' replace />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </DndProvider>
  </React.StrictMode>,
);
