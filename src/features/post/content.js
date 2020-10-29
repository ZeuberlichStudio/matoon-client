import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles/content.scss';

export default function PostContent({ content, type, link, promo }) {
    const backgroundLocation = useLocation().state.backgroundLocation;
    const copyButtonRef = React.useRef();

    function copyPromocode() {
        navigator.clipboard.writeText( promo )
            .then( () => { 
                copyButtonRef.current.innerHTML = "Скопированно!";
            }, err => console.log )
    }

    function createLink() {
        const linkTo = {
            pathname: link
        }

        if ( link.includes('product') ) linkTo.state = { backgroundLocation };

        return linkTo;
    }

    return (
        <div className="post-content">
            <p>{ content }</p>
            { (type === 'link' && link) && <Link to={ createLink() }><span>Перейти</span></Link> }
            { (type === 'promo' && promo) && <button onClick={ copyPromocode }><span ref={ copyButtonRef }>Скопировать</span></button> }
        </div>
    );
}