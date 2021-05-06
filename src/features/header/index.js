import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleHeaderLayer, toggleSearch, setModalElement, animateModalElement } from '~/app/ui';
import { toggleUI } from '~/features/modal-ui';

import Search from '~/features/search/index';

import logo from '~/assets/images/logo.svg';
import './index.scss';

function Header({ toggleMenu }) {

    const dispatch = useDispatch();
    const targetDevice = useSelector( state => state.device.target );
    const {
        headerOverlay,
        modalElement
    } = useSelector(({ui}) => ui);
    const ref = React.useRef();

    function focusCallback() {
        dispatch(toggleHeaderLayer(true));
    }

    const toggleUIClickHandler = (payload) => toggleUI( dispatch, setModalElement, modalElement, payload );

    return (
        <header ref={ref} id="header" className={`app-header`} style={{ zIndex: headerOverlay ? 20 : 10 }}>
            <div className="app-header_logo">
                <Link to="/" onClick={() => toggleUIClickHandler(null)}><img src={logo}/></Link>
            </div>

            <button onClick={ () => toggleUIClickHandler('menu') } className="app-header_categories">
                <span>Каталог</span>
            </button>

                { 
                    targetDevice === 'mobile' ?  
                    <button className="app-header_search" onClick={ () => toggleUIClickHandler('search') }>
                        <span></span>
                    </button> :
                    <div className="app-header_search">
                        <Search {...{ mini: true, focusCallback }}/>
                    </div>
                }

            <Link to="/about" className="app-header_info"><span>О нас</span></Link>

            <button 
                onClick={ () => toggleUIClickHandler('favourite') } 
                className={`app-header_favourite ${modalElement == 'favourite' ? 'active' : ''}`}
            >
                <span/>
            </button>

            <button 
                onClick={ () => toggleUIClickHandler('cart') } 
                className={`app-header_cart ${modalElement == 'cart' ? 'active' : ''}`}
            >
                <span/>
            </button>
        </header>
    );
}

export default Header;