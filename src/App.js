import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import loadable from '@loadable/component';
import routesConfig from 'app/routes';

import { listenToResize, setPlatform } from './app/device';

import './style.scss';

const routes = routesConfig.reduce( (acc, next) => {

    acc[next.componentName] = loadable( () => import(`./${next.moduleName}.js`), {
        fallback: <span>loading...</span>
    });

    return acc;
}, {});

const {
    MainPage,
    CategoryPage,
    ProductPage,
    DevPage
} = routes;

import NewModal from 'features/new-modal';

function App() {
    const listener = useSelector( state => state.device.listener );
    const dispatch = useDispatch();

    const location = useLocation();
    const background = location.state && location.state.backgroundLocation;

    React.useEffect(() => {
        if ( !listener ) {
            dispatch(setPlatform(window.navigator.platform));
            listenToResize(dispatch);
        }

        if ( background ) {
            document.body.style.overflowY = 'hidden';
            document.body.ariaHidden = 'true';
        }
        else {
            document.body.style.overflowY = null;
            document.body.ariaHidden = null;
        }
    }, [listener, background]);

    return (
        <React.Fragment>
            <Switch location={ background || location }>
                <Route exact={ true } path="/" component={ MainPage }/>
                <Route path="/catalog/category=:slug" component={ CategoryPage }/>
                <Route path="/catalog/product=:slug" component={ ProductPage }/>
                <Route path="/dev" component={ DevPage }/>
            </Switch>
            { 
                background && 
                <Switch>
                    <Route path="/catalog/product=:slug">
                        <NewModal>
                            <ProductPage/>
                        </NewModal>
                    </Route>
                </Switch>
            }
        </React.Fragment>
    );
};

export default App;
