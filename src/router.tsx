import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import { Main } from './pages/Main';
import { Statistic } from './pages/Statistic';
import { App } from './App';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      { index: true, element: <Main/> },
      { path: 'statistic/', element: <Statistic/> },
    ],
  },
]);
