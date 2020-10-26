import React from 'react';
import './styles/block.scss';

export default function CategoriesBlock({ title, cats, dimension, selection, select }) {

    return (
        <div className="categories-block">
            <h3><span>{ title }</span></h3>

            <ul>
                { 
                    cats.map( (cat, i) => {

                        function handleClick() {
                            if ( !cat.children ) return ;
                            select( dimension + 1, i )
                        }

                        return (
                            <li 
                                className={i === selection[dimension + 1] ? 'active' : ''} 
                                onClick={ handleClick }
                            >
                                <span>{ cat.name }</span>
                            </li>
                        );
                    }) 
                }
            </ul>
        </div>
    );
}