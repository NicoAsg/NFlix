import React from 'react';
import { Outlet } from "react-router-dom"
import './App.css';
import Header from './typescript/components/header/Header';
import Loading from './typescript/components/Loading';

function App() {
  return (
    <div>
      <Header />
      <div id="content">
        <Outlet />
      </div>
    </div>
  )
}


export default App;