import React from 'react';
import { render } from 'react-dom';

import store from '~/app/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App.js';

render( 
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('app') 
);