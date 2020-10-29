import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './index.scss';

import LogoPh from 'assets/images/logo_ph.svg';

export default function Header({ toggleMenu, focus }) {

    const targetDevice = useSelector( state => state.device.target );

    return (
        <header id="header" className={`app-header ${ focus ? `focus ${ focus }` : '' }`}>
            <div className="app-header_logo">
                <Link to="/"><img src={ LogoPh } alt=""/></Link>
            </div>

            <button onClick={ toggleMenu } className="app-header_categories">
                <span>Каталог</span>
            </button>

            <div className="app-header_search"><span>Поиск</span></div>

            <button className="app-header_info"><span>О нас</span></button>

            <button className="app-header_favourite"><span></span></button>
            <button className="app-header_cart"><span></span></button>
            <button className="app-header_account"><span></span></button>

            { targetDevice === 'mobile' && <button className="app-header_more"><span></span></button> }
        </header>
    );
}