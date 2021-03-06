import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listenToResize, setPlatform } from '~/app/device';
import { Helmet } from 'react-helmet';

import './style.scss';

import NewModal from '~/features/new-modal';
import Header from '~/features/header';
import ModalUI from '~/features/modal-ui';

import MainPage from '~/pages/MainPage';
import PostPage from '~/pages/PostPage/Index.js';
import CatalogPage from '~/pages/CatalogPage';
import CategoryPage from '~/pages/CategoryPage';
import SearchPage from '~/pages/SearchPage';
import ProductPage from '~/pages/ProductPage';
import AboutPage from '~/pages/AboutPage';
import NotFoundPage from '~/pages/404';

import favIco from '~/assets/images/fav.ico';
import favSvg from '~/assets/images/fav.svg';

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

    const uiState = useSelector( ({ui}) => ui );

    const modalRef = React.useRef();
    
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
          setTimeout(() => dispatch(toggleSearch(false)), 200);
        }
    }

    function toggleFavouriteCallback() {
        if ( !uiState.favourite ) {
            dispatch(toggleFavourite(true));
        } else {
            modalRef.current.style.backgroundColor = 'rgba(0,0,0,0)';
            modalRef.current.children[0].style.transform = 'translateX(100%)';
            setTimeout(() => dispatch(toggleFavourite(false)), 200);
        }
    }

    return (
        <React.Fragment>
            <Helmet>
                <link rel="icon" href={favIco} />
                <link rel="icon" href={favSvg} type="image/svg+xml" />
            </Helmet>

            <Header {...{toggleMenu: toggleMenuCallback, toggleSearch: toggleSearchCallback, toggleFavourite: toggleFavouriteCallback}}/>

            <Switch location={ background || location }>
                <Route exact={ true } path="/" component={ MainPage }/>
                <Route path="/about" component={ AboutPage }/>
                <Route path="/feed/post=:slug" component={ PostPage }/>
                <Route exact={ true } path="/catalog" component={ CatalogPage }/>
                <Route path="/catalog/category=:slug/search=:search" component={ SearchPage }/>
                <Route path="/catalog/category=:slug" component={ CategoryPage }/>
                <Route path="/catalog/product=:slug" component={ ProductPage }/>
                <Route path="/catalog/search=:search" component={ SearchPage }/>
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

            { uiState.modalElement && <ModalUI/> }
            <div className={`${ uiState.overlay ? 'visible' : '' }`} id="overlay"/>
        </React.Fragment>
    );
};

export default App;
