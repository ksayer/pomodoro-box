import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Header } from './components/Header';
import { getSettings } from './store/slices/settings';

export function App() {
  const { theme } = useSelector(getSettings);
  document.firstElementChild?.setAttribute('data-theme', theme);
  return (
    <>
      <Header/>
      <main>
        <div className={'container'}>
          <Outlet/>
        </div>
      </main>
    </>
  );
}
