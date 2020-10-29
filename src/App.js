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
    PostPage,
    CategoryPage,
    ProductPage,
    DevPage,
    NotFoundPage
} = routes;

import NewModal from 'features/new-modal';
import Header from 'features/header';
import Categories from 'features/categories';

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
    }, [listener]);

    const [navFocus, setNavFocus] = React.useState(false);

    const [menu, setMenu] = React.useState(false);
    const modalRef = React.useRef();

    const menuContentStyles = {
      initial: {
        transform: 'translateX(-100%)'
      },
      final: {
          transform: 'translateX(0)'
      }
    }
    
    function toggleMenu() {
      if ( !menu ) { 
        setMenu(true);
      } else {
        modalRef.current.style.backgroundColor = 'rgba(0,0,0,0)';
        modalRef.current.children[0].style.transform = 'translateX(-100%)';
        setTimeout(() => setMenu(false), 200);
      }
    }

    React.useEffect(() => {
      if ( menu ) setNavFocus('menu');
      else if ( background ) setNavFocus('background');
      else setNavFocus(null);
    }, [menu, background]);

    return (
        <React.Fragment>
            <Header {...{toggleMenu, focus: navFocus}}/>

            <Switch location={ background || location }>
                <Route exact={ true } path="/" component={ MainPage }/>
                <Route path="/feed/post=:slug" component={ PostPage }/>
                <Route path="/catalog/category=:slug" component={ CategoryPage }/>
                <Route path="/catalog/product=:slug" component={ ProductPage }/>
                <Route path="/dev" component={ DevPage }/>
                <Route path="*" component={ NotFoundPage }/>
            </Switch>
            { 
                background && 
                <Switch>
                    <Route path="/catalog/product=:slug">
                        <NewModal ref={ modalRef }>
                            <ProductPage/>
                        </NewModal>
                    </Route>

                    <Route path="/feed/post=:slug">
                        <NewModal ref={ modalRef }>
                            <PostPage/>
                        </NewModal>
                    </Route>
                </Switch>
            }
            { 
                menu && 
                <NewModal ref={modalRef} contentStyles={menuContentStyles} closeCallback={toggleMenu}> 
                    <Categories/>
                </NewModal>
            }
        </React.Fragment>
    );
};

export default App;
