import React from 'react';
import { Link } from 'react-router-dom';
import './styles/block.scss';

export default function CategoriesBlock({ 
    title, 
    slug, 
    cats, 
    dimension, 
    selection, 
    select, 
    goBack, 
    closeButton
}) {

    return (
        <div className="categories-block-wrapper">
            <div className="categories-block">
                <div className="categories-block_header">
                    { goBack && <button onClick={ goBack } className="categories-block_go-back"/> }
                    <h3><span>{ title }</span></h3>
                    { closeButton && closeButton }
                </div>

                <ul>
                    { 
                        cats.map( (cat, i) => 
                            cat.children ?
                            <li 
                                className={i === selection[dimension + 1] ? 'active' : ''} 
                                onMouseEnter={ () => select( dimension + 1, i ) }
                            >
                                <span>{ cat.name }</span>
                            </li> :
                            <li className={i === selection[dimension + 1] ? 'active' : ''}>
                                <Link to={`/catalog/category=${ cat.slug }`}><span>{ cat.name }</span></Link>
                            </li>
                        ) 
                    }
                </ul>
                    
                <div className="categories-block_link">
                    <Link to={`/catalog/category=${ slug || "all" }`}>
                        <span>{ dimension > 0 ? "Все товары в категории" : "Все товары в каталоге" }</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}