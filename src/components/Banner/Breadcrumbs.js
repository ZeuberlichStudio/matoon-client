import React from 'react';
import { Link } from 'react-router-dom';
import './styles/breadcrumbs.scss';

function Breadcrumbs({ ancestors }) {

    function catPathname(slug) {
        return '/catalog/category=' + slug;
    }

    return (
        <ul className="breadcrumbs">
            { 
                ancestors.map( ( { name, slug }, i, arr ) => 
                    <>
                    <li>
                        <Link to={ catPathname(slug) }>{ name }</Link>
                    </li>
                    { arr[i + 1] && <span>&nbsp;/&nbsp;</span> }
                    </>
                ) 
            }
        </ul>
    );
}

export default Breadcrumbs;