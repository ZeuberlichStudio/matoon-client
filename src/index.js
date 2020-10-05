import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';

import store from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

render( 
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('app') 
);