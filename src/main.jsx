import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DataProvider } from './Components/DataProvider/DataProvider.jsx'
import {initialState,reducer} from './Utility/reducer.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider reducer={reducer} initialState={initialState}>
      <App />
      </DataProvider>
  </StrictMode>
)

// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import { DataProvider } from "./Components/DataProvider/DataProvider";
// import { initialState, reducer } from "./Utility/reducer";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <DataProvider reducer={reducer} initialState={initialState}>
//       <App />
//     </DataProvider>
//   </React.StrictMode>
// );
