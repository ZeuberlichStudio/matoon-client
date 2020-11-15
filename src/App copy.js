import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import loadable from '@loadable/component';
import routesConfig from 'app/routes';

import { listenToResize, setPlatform } from 'app/device';
import { toggleMenu, toggleSearch } from 'app/ui';

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
    SearchPage,
    ProductPage,
    DevPage,
    NotFoundPage
} = routes;

import NewModal from 'features/new-modal';
import Header from 'features/header';
import Categories from 'features/categories';
import Search from 'features/search';

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

    //ui state and side effects

    const uiState = useSelector( state => state.ui );

    const modalRef = React.useRef();

    const menuContentStyles = {
      initial: {
        transform: 'translateX(-100%)'
      },
      final: {
          transform: 'translateX(0)'
      }
    }
    
    function toggleMenuCallback() {
      if ( !uiState.menu ) { 
        dispatch(toggleMenu(true));
      } else {
        modalRef.current.style.backgroundColor = 'rgba(0,0,0,0)';
        modalRef.current.children[0].style.transform = 'translateX(-100%)';
        setTimeout(() => dispatch(toggleMenu(false)), 200);
      }
    }

    function toggleSearchCallback() {
        if ( !uiState.search ) { 
          dispatch(toggleSearch(true));
        } else {
        //modalRef.current.style.backgroundColor = 'rgba(0,0,0,0)';
        //modalRef.current.children[0].style.transform = 'translateX(-100%)';
          setTimeout(() => dispatch(toggleSearch(false)), 200);
        }
    }

    return (
        <React.Fragment>
            <Header {...{toggleMenu: toggleMenuCallback}}/>

            <Switch location={ background || location }>
                <Route exact={ true } path="/" component={ MainPage }/>
                <Route path="/feed/post=:slug" component={ PostPage }/>
                <Route path="/catalog/category=:slug" component={ CategoryPage }/>
                <Route path="/catalog/search=:search" component={ SearchPage }/>
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
                uiState.menu && 
                <NewModal ref={modalRef} contentStyles={menuContentStyles} closeCallback={toggleMenuCallback} navFocus={ true }> 
                    <Categories/>
                </NewModal>
            }
            {
                uiState.search &&
                <NewModal {...{ ref: modalRef, navFocus: true, closeCallback: toggleSearchCallback }}>
                    <div id="search-wrapper" className="search-wrapper"><Search/></div>
                </NewModal>
            }
            <div className={`${ uiState.overlay ? 'visible' : '' }`} id="overlay"/>
        </React.Fragment>
    );
};

export default App;
