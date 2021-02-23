import React from "react";
import useDevice from '~/hooks/useDevice';
import { Switch, Route } from 'react-router-dom';

import NotFoundPage from './pages/404';
import CategoryPage from './pages/CategoryPage';

export default function App() {

    useDevice();

    return (
        <div id="app">
            <Switch>
                <Route path="/category=:slug" component={CategoryPage} />
                <Route path="/*" component={NotFoundPage} />
            </Switch>
        </div>
    )
}