import React from 'react';
import { Outlet } from "react-router-dom"
import './App.css';
import Header from './typescript/components/header/Header';

function App() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}


export default App;