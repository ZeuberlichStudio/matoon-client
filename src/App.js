import React from 'react';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { listenToResize, setPlatform } from './app/device'
import './style.scss';

import CategoryPage from 'pages/category';

function App() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(setPlatform(window.navigator.platform));
        listenToResize(dispatch);
    }, []);

    return (
        <Route path="/catalog/category=:slug" component={ CategoryPage }/>
    );
};

export default App;
