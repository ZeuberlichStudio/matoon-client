import React from 'react';

import './styles/content.scss';

export default function PostContent({ content, type, link, promo }) {

    const copyButtonRef = React.useRef();

    function copyPromocode() {
        navigator.clipboard.writeText( promo )
            .then( () => { 
                copyButtonRef.current.innerHTML = "Скопированно!";
            }, err => console.log )
    }

    return (
        <div className="post-content">
            <p>{ content }</p>
            { (type === 'link' && link) && <a href={ link }><span>Перейти</span></a> }
            { (type === 'promo' && promo) && <button onClick={ copyPromocode }><span ref={ copyButtonRef }>Скопировать</span></button> }
        </div>
    );
}