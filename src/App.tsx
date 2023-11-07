import React from 'react';
import {Header} from "./components/Header";
import {Outlet} from 'react-router-dom';


export function App() {
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

