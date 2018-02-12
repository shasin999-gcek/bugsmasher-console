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
