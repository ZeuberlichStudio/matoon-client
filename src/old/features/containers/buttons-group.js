import React from 'react';

import './styles/buttons-group.scss';

export default function ButtonsGroup({ children, shown = 2 }) {

    const [ open, setOpen ] = React.useState(false);

    function toggle() {
        setOpen( !open );
    }

    return (
        <div className='buttons-group'>
            { open || children.length <= shown ? children : children.slice( 0, shown ) }
            {
                children.length > shown &&
                <button onClick={ toggle }  className={ `buttons-group_toggle ${ open ? 'active' : '' }` }>
                    <span/>
                </button>
            }
        </div>
    );
}

export function ButtonsGroupAutomatic({ children }) {

    const [ open, setOpen ] = React.useState(false);
    const [ initiated, setInitiated ] = React.useState(false);
    const [ fittingCount, setFittingCount ] = React.useState(0);

    const containerRef = React.useRef();

    React.useEffect( () => {
        if ( 
            containerRef.current && 
            children &&
            !initiated
        ) initGroup();
    }, [containerRef, children, initiated]);

    function initGroup() {
        const containerWidth = containerRef.current.offsetWidth;
        const childNodes = containerRef.current.children;
        let fittingCount = 0;

        const { width: toggleWidth, margin: toggleMargin } = getComputedStyle( childNodes[ childNodes.length - 1 ] );

        let contentWidth = parseFloat(toggleWidth) + parseFloat(toggleMargin) * 2;

        for ( let i = 0; i < childNodes.length; i++ ) {
            const { width, margin } = getComputedStyle(childNodes[i]);
            const childOuterWidth = parseFloat(width) + parseFloat(margin) * 2;
            contentWidth += childOuterWidth;

            if ( contentWidth >= containerWidth ) {
                fittingCount = i;
                break;
            } 
        }

        setInitiated(true);
        setFittingCount(fittingCount);
    }

    function toggle() {
        setOpen( !open );
    }

    return (
        <div ref={ containerRef } className='buttons-group'>
            { open || !initiated ? children : children.slice( 0, fittingCount ) }
            <button onClick={ toggle }  className={ `buttons-group_toggle ${ open ? 'active' : '' }` }>
                <span/>
            </button>
        </div>
    );
}