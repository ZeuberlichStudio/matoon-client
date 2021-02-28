import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTarget } from '~/app/device';

import Modal from '~/features/new-modal';
import Controls from './controls';
import ProductGrid from './grid';
import Filters from '~/features/filters/filters';

import './catalog.scss';

export default function Catalog({ catSlug }) {

    const dispatch = useDispatch();
    const isMobile = useSelector(selectTarget) === 'mobile';

    const [filters, setFilters] = React.useState(false);
    const modalRef = React.useRef();

    const filtersContentStyles = {
      initial: {
        transform: 'translateY(100%)'
      },
      final: {
          transform: 'translateY(0)'
      }
    }
    
    function toggleFilters() {
      if ( !filters ) { 
        setFilters(true);
      } else {
        modalRef.current.style.backgroundColor = 'rgba(0,0,0,0)';
        modalRef.current.children[0].style.transform = 'translateY(100%)';
        setTimeout(() => setFilters(false), 200);
      }
    }

    const [gridView, setGridView] = React.useState('mini');

    const controlsProps = {
        view: gridView,
        changeView: setGridView,
        filters,
        toggleFilters: setFilters
    }

    return (
        <div id="catalog" className="catalog">
            <Controls className={`product-grid_controls`} {...controlsProps}/>
            <ProductGrid catSlug={catSlug} view={gridView}/>
            { 
                !isMobile && <Filters catSlug={catSlug}/>
            }
            { 
                (isMobile && filters ) && 
                <Modal ref={modalRef} contentStyles={filtersContentStyles} closeCallback={ toggleFilters }>
                    <Filters catSlug={catSlug}/>
                </Modal> 
            }
        </div>
    );
}

