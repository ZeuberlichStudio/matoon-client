import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import loadable from '@loadable/component';
import routesConfig from 'app/routes';
import { SpinningLoader as Loader } from 'features/loader';
import { listenToResize, setPlatform } from 'app/device';
import { toggleMenu, toggleSearch, toggleFavourite } from 'app/ui';

import './index.scss';

const routes = routesConfig.reduce( (acc, next) => {

    acc[next.componentName] = loadable( () => import(`./${next.moduleName}.js`), {
        fallback: <Loader fixed={true}/>
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
// import Categories from 'features/categories';
// import Search from 'features/search';
// import Favourite from 'features/favourite';
import ModalUI from 'features/modal-ui';

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
          setTimeout(() => dispatch(toggleSearch(false)), 200);
        }
    }

    const favouriteContentStyles = {
        initial: {
          transform: 'translateX(100%)'
        },
        final: {
            transform: 'translateX(0)'
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
            <Header {...{toggleMenu: toggleMenuCallback, toggleSearch: toggleSearchCallback, toggleFavourite: toggleFavouriteCallback}}/>

            <Switch location={ background || location }>
                <Route exact={ true } path="/" component={ MainPage }/>
                <Route path="/feed/post=:slug" component={ PostPage }/>
                <Route path="/catalog/category=:slug" component={ CategoryPage }/>
                <Route path="/catalog/search=:search" component={ SearchPage }/>
                <Route path="/catalog/product=:id" component={ ProductPage }/>
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

            { uiState.modalElement && <ModalUI/> }
            <div className={`${ uiState.overlay ? 'visible' : '' }`} id="overlay"/>
        </React.Fragment>
    );
};

export default App;
