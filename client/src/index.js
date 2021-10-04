import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './sass/main.scss'
import { BrowserRouter } from 'react-router-dom'
import LogInState from './context/LogInState'

ReactDOM.render(
  <BrowserRouter>
    <LogInState>
      <App />
    </LogInState>
  </BrowserRouter>,
  document.getElementById('root')
);

