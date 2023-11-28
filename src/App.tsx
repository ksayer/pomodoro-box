import React from 'react';
import {Header} from "./components/Header";
import {Outlet} from 'react-router-dom';
import {useSelector} from "react-redux";
import {getSettings} from "./store/slices/settings";


export function App() {
  const {theme} = useSelector(getSettings)
  document.firstElementChild?.setAttribute('data-theme', theme)
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

