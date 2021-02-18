import React, { Children } from 'react';
import './index.scss';

function Scrollable({children}) {

    const [isScrollble, setIsScrollable] = React.useState(false);

    const content = React.useRef();
    const scrollbarRail = React.useRef();
    const scrollbarThumb = React.useRef();

    React.useEffect(() => {
        resizeHandler();
        window.addEventListener('resize', resizeHandler);
        return () => window.removeEventListener('resize', resizeHandler);
    }, [children]);
    React.useEffect(() => scrollHandler(content.current), [isScrollble]);

    function resizeHandler() {
        const {
            clientHeight: containerHeight,
            scrollHeight: contentHeight
        } = content.current;

        if ( contentHeight == containerHeight ) setIsScrollable(false);
        else setIsScrollable(true);
    }

    let timer;

    function showScrollbar() {
        if ( !scrollbarRail.current && !scrollbarThumb.current ) return;
        scrollbarRail.current.style.opacity = 1;
        scrollbarThumb.current.style.opacity = 1;
    }

    function hideScrollbar() {
        if ( !scrollbarRail.current && !scrollbarThumb.current ) return;
        scrollbarRail.current.style.opacity = 0;
        scrollbarThumb.current.style.opacity = 0;
    }

    function scrollHandler(target) {
        if ( !isScrollble ) return;

        clearTimeout(timer);

        const {
            clientHeight: containerHeight,
            scrollHeight: contentHeight,
            scrollTop: scrollPosition
        } = target;

        const {
            clientHeight: railHeight
        } = scrollbarRail.current;

        scrollbarThumb.current.style.height = `${(containerHeight/contentHeight) * railHeight}px`;
        scrollbarThumb.current.style.top = `${(scrollPosition / contentHeight) * railHeight}px`;
        showScrollbar();
        timer = setTimeout(hideScrollbar, 2000);
    }

    return ( 
        <div className="scrollable-container">
            <div 
                ref={content}
                onScroll={e => scrollHandler(e.target)}
                className="scrollable-content"
            >
                {children}
            </div>
            {
                isScrollble &&
                <div className="scrollbar">
                    <div ref={scrollbarRail} className="scrollbar-rail"/>
                    <div ref={scrollbarThumb} className="scrollbar-thumb"/>
                </div>
            }
        </div>
    );
}

export default Scrollable;