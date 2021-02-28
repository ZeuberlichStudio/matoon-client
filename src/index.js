import React from 'react';
import { render } from 'react-dom';

import store from '~/app/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// import App from './App.js';

render( 
    <Provider store={store}>
        <BrowserRouter>
            <h1>HIIII</h1>
        </BrowserRouter>
    </Provider>,
    document.getElementById('app') 
);