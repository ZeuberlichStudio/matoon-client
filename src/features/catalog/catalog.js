import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTarget } from 'app/device';

import { Modal } from 'features/modal/modal';
import Controls from './controls';
import ProductGrid from './grid';
import Filters from 'features/filters/filters';

import './catalog.scss';

export default function Catalog({ catSlug }) {

    const dispatch = useDispatch();

    const isMobile = useSelector(selectTarget) === 'mobile';

    const [gridView, setGridView] = React.useState('mini');
    const [filtersOpen, setFiltersOpen] = React.useState(false);

    const controlsProps = {
        view: gridView,
        changeView: setGridView,
        filtersOpen,
        toggleFilters: setFiltersOpen
    }

    const gridProps = {
        catSlug,
        view: gridView
    }

    const filtersModalProps = {
        title: 'Фильтры',
        closeCallback: () => setFiltersOpen(false)
    }

    React.useEffect(() => {
        stickFilters();
    }, [stickFilters, isMobile]);

    function stickFilters() {
        const catalog = document.getElementById('catalog');
        const controls = document.getElementById('controls');
        const filters = document.getElementById('product-filters-wrapper');
        let lastScroll = window.scrollY;
        window.removeEventListener('scroll', handleScroll);
        !isMobile && window.addEventListener('scroll', handleScroll);

        function handleScroll() {
            if ( window.scrollY > window.innerHeight && !controls.classList.contains('hide-annotation') ) {
                controls.classList.add('hide-annotation'); 
            }
            else if ( window.scrollY <= window.innerHeight && controls.classList.contains('hide-annotation') ) {
                controls.classList.remove('hide-annotation'); 
            }

            if ( filters.offsetHeight < window.innerHeight ) return;

            const scrollDif = lastScroll - window.scrollY;
            const direction = lastScroll < window.scrollY ? 1 : -1;
            const filtersRectangle = filters.getBoundingClientRect();

            const minOffset = 0;
            const maxOffset = - (filters.offsetHeight - window.innerHeight);
            const oldOffset = parseFloat(filters.style.getPropertyValue('--offset'));
            const newOffset = oldOffset + scrollDif;

            if ( filtersRectangle.top <= 0 && filtersRectangle.bottom > window.innerHeight && direction > 0 ) {
                filters.style.setProperty('--offset', `${newOffset < maxOffset ? maxOffset : newOffset}`);
            }
            else if ( filtersRectangle.top < 0 && direction < 0 ) {
                filters.style.setProperty('--offset', `${newOffset > minOffset ? minOffset : newOffset}`);
            }
            else if ( filtersRectangle.top > 0 && oldOffset !== 0 ) {
                filters.style.setProperty('--offset', `0`);
            }

            lastScroll = window.scrollY;
        }
    }

    return (
        <div id="catalog" className="catalog">
            <Controls className={`product-grid_controls`} {...controlsProps}/>
            <ProductGrid {...gridProps}/>
            { 
                !isMobile && 
                <div style={{'--offset': 0}} id="product-filters-wrapper" className="product-filters-wrapper">
                    <Filters catSlug={catSlug}/>
                </div> 
            }
            { 
                (isMobile && filtersOpen) && 
                <Modal {...filtersModalProps}>
                    <Filters catSlug={catSlug}/>
                </Modal> 
            }
        </div>
    );
}

