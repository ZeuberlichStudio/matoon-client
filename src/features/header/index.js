import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

export default function Header() {
    return (
        <header id="header" className="app-header">
            <Link to="/"/>
        </header>
    );
}