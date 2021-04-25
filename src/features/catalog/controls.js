import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortingChanged } from '~/features/catalog/querySlice';

export default function GridControls({
    className = 'product-grid_controls',
    view = 'mini',
    changeView,
    filtersOpen,
    toggleFilters
}) {

    const targetDevice = useSelector(state => state.device.target);

    const viewButtonProps = {
        view,
        changeView
    };

    const filtersToggleProps = {
        filtersOpen,
        toggleFilters
    };

    return (
        <div id="controls" className={className}>
            <div className={`${className}_sorting`}>
                <h3>Сортировка</h3>
                <div className={`${className}_sorting_buttons-wrapper`}>
                    <div className={`${className}_sorting_buttons`}>
                        {/* <SortButton value="meta.orders,-1">Популярные</SortButton> */}
                        <SortButton value="meta.updatedAt,-1">Новые</SortButton>
                        <SortButton value="price,1">Дешевле</SortButton>
                        <SortButton value="price,-1">Дороже</SortButton>
                        {/* <SortButton value="SALE">Со скидкой</SortButton> */}
                    </div>
                </div>
            </div>
            {
                targetDevice === 'mobile' ?
                <div className={`${className}_filters`}>
                    <div>
                        <FiltersToggle {...filtersToggleProps}/>
                    </div>
                </div> :
                <div className={`${className}_view`}>
                    <h3>Отображение</h3>
                    <div className={`${className}_view_buttons`}>
                        <ViewButton value="mini" {...viewButtonProps}/>
                        <ViewButton value="full" {...viewButtonProps}/>
                    </div>
                </div>
            }
        </div>
    );
}

function SortButton({children, name = children, value}) {
    const dispatch = useDispatch();

    const [active, setActive] = React.useState(false);
    const sortingState = useSelector(state => state.query.sort);

    React.useEffect(() => {
        setActive( sortingState === value );
    }, [sortingState]);

    function applySorting() {
        dispatch(sortingChanged(value));
    }

    return (
        <button onClick={applySorting} className={active ? 'active' : null}>
            <span>{ name }</span>
        </button>
    );
}

function ViewButton({value, view, changeView}) {

    const [active, setActive] = React.useState(false);

    React.useEffect(() => {
        setActive( view === value );
    }, [view]);

    return (
        <button onClick={() => changeView(value)} className={active ? 'active' : null}><span>{ name }</span></button>
    );
}

function FiltersToggle({filtersOpen, toggleFilters}) {

    const [active, setActive] = React.useState(false);

    React.useEffect(() => {
        setActive(filtersOpen);
    }, [filtersOpen]);

    return (
        <button onClick={() => toggleFilters(!active)} className={active ? 'active' : null}><span></span></button>
    );
}