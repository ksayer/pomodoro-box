import {createBrowserRouter} from "react-router-dom";
import {Main} from "./pages/Main";
import {Statistic} from "./pages/Statistic";
import React from "react";
import {App} from "./App";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {index: true, element: <Main/>},
      {path: 'statistic/', element: <Statistic/>}
    ]
  }
])
