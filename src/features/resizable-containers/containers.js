import React from 'react';

import './containers.scss';

export function ButtonsBlock({ children, className, callback, shown = 3 }) {
    const [open, setOpen] = React.useState(false);
    const [resizable, setResizable] = React.useState(false);

    React.useEffect(() => {
        if ( children && children.length > shown ) {
            setResizable(true);
        }
    }, [children]);

    function toggle() {
        callback && callback();
        setOpen(!open);
    }

    const renderButton = () => (
        <button 
            className={`${className}_resize ${open ? `active` : null}`} 
            onClick={toggle}
        >
            <span></span>
        </button>
    );

    const renderChildren = () => {
        if ( !resizable ) return children;
        else return open ? children : children.slice(0, shown);
    }

    return(
        <div className={className}>
            { children && renderChildren() }
            { resizable && renderButton() }
        </div>
    );
}

export function ResizableText({ children, callback }) {
    const [resizable, setResizable] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const contentRef = React.createRef();

    React.useEffect(() => {
        contentRef.current.offsetHeight < contentRef.current.scrollHeight ? setResizable(true) : setResizable(false);
    }, [children]);

    function toggle() {
        callback && callback();
        setOpen(!open);
    }

    const renderButton = () => (
        <button onClick={ toggle } className={`resizable-text_toggle ${open ? 'open' : null} `}>
            <span>{ open ? 'свернуть' : 'развернуть' }</span>
        </button>
    );

    return (
        <div className={`resizable-text ${resizable ? 'resizable' : null} ${open ? 'open' : null}`}>
            <div ref={contentRef} className="resizable-text_content">
                { children }
            </div>
            { resizable && renderButton() }
        </div>
    );
}