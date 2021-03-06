import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { selectTarget } from '~/app/device';
import './styles/block.scss';

export default function CategoriesBlock({ 
    title, 
    slug, 
    cats, 
    dimension, 
    selection, 
    select, 
    goBack, 
    closeButton,
    closeModal
}) {

    const history = useHistory();
    const targetDevice = useSelector(selectTarget);

    const goToCat = slug => { history.push(`/catalog/category=${slug}`); closeModal(); }
    const unfoldChildren = index => select(dimension + 1, index);

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
                            cat.subcats ?
                            <li 
                                key={i}
                                className={(i === selection[dimension + 1] ? 'active' : '') + ' has_children'} 
                                onMouseEnter={ targetDevice == 'desktop' ? () => unfoldChildren(i) : null }
                                onClick={ targetDevice == 'desktop' ? () => goToCat(cat.slug) : () => unfoldChildren(i) }
                            >
                                <span>{ cat.name }</span>
                            </li> :
                            <li className={i === selection[dimension + 1] ? 'active' : ''} key={i}>
                                <Link to={`/catalog/category=${ cat.slug }`} onClick={ closeModal }>
                                    <span>{ cat.name }</span>
                                </Link>
                            </li>
                        ) 
                    }
                </ul>
                    
                <div className="categories-block_link">
                    <Link to={`/catalog${ dimension > 0 ? `/category=${slug}` : '' }`} onClick={ closeModal }>
                        <span>{ dimension > 0 ? "Все товары в категории" : "Все товары в каталоге" }</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}