import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.global.css';
import {RouterProvider} from "react-router-dom";
import {router} from "./router";
import {Provider} from "react-redux";
import {persistor, store} from "./store/store";
import {PersistGate} from "redux-persist/integration/react";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router}/>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
