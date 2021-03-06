import React from 'react';
import './slider.scss';

export default function Slider({ 
    children, 
    loop = true, 
    time = 300, 
    id, 
    slide, 
    controls = true
}) {

    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [touchStartX, setTouchStartX] = React.useState(0);
    const [animating, setAnimating] = React.useState(false);
    const [slides, setSlides] = React.useState([]);
    const [count, setCount] = React.useState(null);
    const containerRef = React.useRef();

    React.useEffect(() => {
        const validChildren = children.filter(child => child);
        setSlides(validChildren);
        setCount(validChildren.length);
    }, [children]);

    function invisibleGoTo(i) {
        setAnimating(false);
        setCurrentSlide(i);
    }
    
    function goToSlide(i) {
        if ( !loop && (i > count - 1 ||  i < 0) ) return;

        if ( i > count - 1 ) {
            !animating && setAnimating(true);
            setCurrentSlide(i);
            setTimeout( () => invisibleGoTo(0), time );
        } 
        else if ( i < 0 ) {
            !animating && setAnimating(true);
            setCurrentSlide(i);
            setTimeout( () => invisibleGoTo(count - 1), time );
        }
        else {
            !animating && setAnimating(true);
            setCurrentSlide(i);
        }
    }

    React.useEffect(() => {
        if ( typeof(slide) === 'number' ) goToSlide(slide);
    }, [slide]);

    const containerStyle = {
        transition: animating ? `${time}ms` : null
    }

    const listeners = {
        onTouchStart: e => {
            setAnimating(false);
            setTouchStartX(e.touches[0].clientX);
        },
        onTouchMove: e => {
            const currentPoint = e.changedTouches[0].clientX;
            containerRef.current.style.setProperty( '--touchOffset', `${ currentPoint - touchStartX }px` );
        },
        onTouchEnd: e => {
            const threshhold = 20;
            const currentPoint = e.changedTouches[0].clientX;
            const offset = currentPoint - touchStartX;

            if ( Math.abs(offset) < threshhold ) return;
            containerRef.current.style.setProperty( '--touchOffset', `0px` );
            goToSlide( currentSlide + ( offset > 0 ? -1 : 1 ) );
        }
    }

    return (
        <div id={ id } className="slider" style={{ "--slide": currentSlide }}>
            { controls && <button className="slider_prev" onClick={ () => goToSlide(currentSlide - 1) }/> }
            
            <div className="slider_slides-wrapper">
                <div ref={ containerRef } className="slider_slides-container" style={containerStyle}>
                    { 
                        slides.slice(-2).map( (child, i, arr) => {
                            const number = count - (arr.length - i);

                            return <Slide 
                                key={`clone-${ number }`} 
                                i={ number } 
                                clone={ true }
                            >
                                { child }
                            </Slide> 
                        }) 
                    }

                    { slides.map( (child, i) => <Slide key={i} i={i}>{ child }</Slide> ) }

                    { 
                        slides.slice(0, 2).map( (child, i) => 
                            <Slide key={`clone-${i}`} i={i} clone={ true }>
                                { child }
                            </Slide> 
                        ) 
                    }
                </div>
            </div>

            { controls && <button className="slider_next" onClick={ () => goToSlide(currentSlide + 1) }/> }

            <Indicator {...{count, currentSlide, goToSlide: controls && goToSlide}}/>
        </div>
    );
}

export function Slide({ i, children, clone }) {
    return (
        <div className={`slide ${ clone ? 'clone-' : '' }slide-${i}`}>
            { children }
        </div>
    );
}

function Indicator({ count, currentSlide, goToSlide }) {

    function renderDots() {
        const dots = [];

        for ( let i = 0; i < count; i++ ) {
            dots.push(
                <span 
                    key={i}
                    onClick={ () => goToSlide && goToSlide(i) } 
                    className={`dot ${ i === currentSlide ? 'active' : '' }`}
                />
            );
        }

        return dots;
    }

    return (
        <div className="slider_indicator">
            { renderDots() }
        </div>
    );
}