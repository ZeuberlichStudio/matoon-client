import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleHeaderLayer, toggleSearch } from 'app/ui';
import './index.scss';

import Search from 'features/search';

import LogoPh from 'assets/images/logo_ph.svg';

function Header({ toggleMenu, toggleFavourite }) {

    const dispatch = useDispatch();
    const targetDevice = useSelector( state => state.device.target );
    const {
        headerOverlay,
        search
    } = useSelector( state => state.ui );
    const ref = React.useRef();

    function focusCallback() {
        dispatch(toggleHeaderLayer(true));
    }

    return (
        <header ref={ref} id="header" className={`app-header`} style={{ zIndex: headerOverlay ? 20 : 10 }}>
            <div className="app-header_logo">
                <Link to="/"><img src={ LogoPh } alt=""/></Link>
            </div>

            <button onClick={ toggleMenu } className="app-header_categories">
                <span>Каталог</span>
            </button>

                { 
                    targetDevice === 'mobile' ?  
                    <button className="app-header_search" onClick={ () => dispatch(toggleSearch(!search)) }>
                        <span></span>
                    </button> :
                    <div className="app-header_search">
                        <Search {...{ mini: true, focusCallback }}/>
                    </div>
                }

            <button className="app-header_info"><span>О нас</span></button>

            <button onClick={ toggleFavourite } className="app-header_favourite"><span></span></button>
            <button className="app-header_cart"><span></span></button>
            <button className="app-header_account"><span></span></button>

            { targetDevice === 'mobile' && <button className="app-header_more"><span></span></button> }
        </header>
    );
}

export default Header;