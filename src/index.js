import React from 'react';
import ReactDOM from 'react-dom';

import 'assets/css/error.css';
import 'assets/css/bootstrap-overrides.css';
import 'assets/css/console.css';

import App from './containers/App/App.jsx';
import Unavailable from './containers/App/Unavailable';

import app from 'helpers/app';

app.getSiteSettings()
   .then(res => {
     if(res.data.maintainance_mode) {
      ReactDOM.render((
        <Unavailable />
      ),document.getElementById('root'));
     } else {
      ReactDOM.render((
        <App />
      ),document.getElementById('root'));
     }
   });

function goodbye(e) {
  if(!e) e = window.event;
  //e.cancelBubble is supported by IE - this will kill the bubbling process.
  e.cancelBubble = true;
  e.returnValue = 'You sure you want to leave/refresh this page?';
  //e.stopPropagation works in Firefox.
  if (e.stopPropagation) {
      e.stopPropagation();
      e.preventDefault();
  }
}

window.onbeforeunload=goodbye;