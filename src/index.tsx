import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import './index.css';
// import Search from './html/Search'
import App from './App';
import reportWebVitals from './reportWebVitals'
import SearchResults from './typescript/components/search/Results'
import Media from './typescript/components/media/Media'
import Watch from './typescript/components/watch/Watch';

const rootElement = document.getElementById('root')

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={ <App /> }>
        <Route path="search" element={ <SearchResults /> } />
        <Route path="media" element={ <Media /> } />
        <Route path="watch" element={ <Watch /> } />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
