import React from 'react';
import apiCall from '~/common/api-call';
import { useDispatch, useSelector } from 'react-redux';
import { filterChanged } from '~/features/catalog/querySlice';
import { selectTarget } from '~/app/device';

import Checkbox from './checkbox';
import Field from './field';

import './filters.scss';

export default function Filters({ catSlug, closeButton, closeModal}) {

    const initialSelectedFilters = {
        color: [],
        brand: [],
        material: [],
        for: [],
        minPrice: null,
        maxPrice: null,
        minStock: null
    }

    //Hooks and properties
    const apiQueryParamsState = useSelector(state => state.query);
    const [selectedFilters, setSelectedFilters] = React.useState(apiQueryParamsState.filter);
    const [fresh, setFresh] = React.useState(true);
    const containerRef = React.useRef();
    const dispatch = useDispatch();
    const [status, setStatus] = React.useState('idle');
    const [error, setError] = React.useState(null);
    const [availableFilters, setAvailableFilters] = React.useState({});
    const [count, setCount] = React.useState(0);
    const targetDevice = useSelector(selectTarget);

    function buildApiQuery() {

        const params =  {
            catSlug,
            minPrice: apiQueryParamsState.filter.minPrice,
            maxPrice: apiQueryParamsState.filter.maxPrice,
            minStock: apiQueryParamsState.filter.minStock
        };

        let query = '';

        for ( const [key, value] of Object.entries(params) ) {
            if ( value ) query += `&${key}=${value}`;
        }

        return query;
    }

    React.useEffect(() => { 
        if ( fresh ) {
            setFresh(!fresh);
            return;
        }

        apiCall(`products/filters?${buildApiQuery()}`)
           .then( result => {
                result.data.for.sort((a, b) => a.name - b.name);
                setAvailableFilters(result.data);
                setStatus('succeeded');
            })
            .catch( err => {
                setError(err);
                setStatus('failed');
            });

    }, [fresh, apiQueryParamsState]);

    React.useEffect(countApplied, [apiQueryParamsState.filter]);

    //Methods
    function addFilter(attr, name) {
        const attrField = selectedFilters[attr];

        const filters = {
            ...selectedFilters,
            [attr]: attrField.concat(name)
        }

        setSelectedFilters(filters);
    }

    function removeFilter(attr, name) {
        const attrField = selectedFilters[attr];

        const filters = {
            ...selectedFilters,
            [attr]: attrField.filter( item => item !== name )
        }

        setSelectedFilters(filters);
    }

    function setFilter(filter) {
        setSelectedFilters({ ...selectedFilters, ...filter });
    }

    function countApplied() {
        let count = 0;

        for ( let [field, value] of Object.entries(apiQueryParamsState.filter) ) {
            count += Array.isArray(value) ? value.length : (value ? 1 : 0);
        }

        setCount(count);
    }

    function reset() {
        setSelectedFilters(initialSelectedFilters);
        setCount(0);
        setFresh(true);
    }

    function apply() {
        dispatch(filterChanged(selectedFilters));
        closeModal && closeModal();
    }

    const renderCheckbox = (filter, attr, key) => (
        <Checkbox 
            {...filter}
            active={selectedFilters[attr].includes(filter._id)}
            key={key} 
            attr={attr} 
            fresh={fresh} 
            addFilter={addFilter} 
            removeFilter={removeFilter}
        />
    )

    const renderField = (name, attr) => 
    <Field key={name} name={name} attr={attr} fresh={fresh} setFilter={setFilter}/>;

    const {
        colors,
        brands,
        materials,
        for: sex
    } = availableFilters;

    //fixes scrollability on ios < 14
    const mobileScrollableStyle = { 
        overflowX: 'hidden', 
        overflowY: 'scroll', 
        '-webkit-overflow-scrolling': 'touch'
    }

    return(
        <div 
            style={targetDevice == 'mobile' ? mobileScrollableStyle : null} 
            id="product-filters-wrapper" 
            className="product-filters-wrapper"
        >
        <div ref={ containerRef } id="product-filters" className="product-filters">
            <div className="product-filters_header">
                <h3>Фильтры</h3>
                { closeButton && closeButton }
            </div>
            
            <div className="product-filters_content">
                {
                    colors?.length > 0 &&
                    <ResizableFiltersGroup name={"Цвет"}>
                        { colors && colors.map((filter, i) => renderCheckbox(filter, "color", i)) }
                    </ResizableFiltersGroup>
                }

                {
                    brands?.length > 0 &&
                    <ResizableFiltersGroup name={"Логотип на товаре / бренд"}>
                        { brands.map((filter, i) => renderCheckbox(filter, "brand", i)) }
                    </ResizableFiltersGroup>
                }

                {
                    materials?.length > 0 &&
                    <ResizableFiltersGroup name={"Материалы"}>
                        { materials.map((filter, i) => renderCheckbox(filter, "material", i)) }
                    </ResizableFiltersGroup>
                }

                {
                    sex?.length > 0 &&
                    <ResizableFiltersGroup name={"Пол / возраст"}>
                        { sex.map((filter, i) => renderCheckbox(filter, "for", i)) }
                    </ResizableFiltersGroup>
                }

                <FiltersGroup name={"Цена (за шт)"}>
                    { renderField("От", "minPrice") }
                    { renderField("До", "maxPrice") }
                </FiltersGroup>

                <FiltersGroup name={"Наличие (шт)"}>
                    { renderField("От", "minStock") }
                </FiltersGroup>
            </div>

            <Controls apply={apply} reset={reset} count={count} />
        </div>
        </div>
    );
}

function FiltersGroup({name, children}) {
    return(
        <div className="filters_group">
            <h3>{ name }</h3>
            <div>{ children } </div>
        </div>
    );
}

function ResizableFiltersGroup({name, children}) {

    const [resizable, setResizable] = React.useState(false);
    const [active, setActive] = React.useState(false);
    const containerRef = React.useRef();
    
    React.useEffect(() => {
        if (children && children.length > 8) {
            setResizable(true);
            setActive(false);
        };   
    }, [children]);

    const renderButton = () => (
        <button 
            className={active ? `active` : null} 
            onClick={() => setActive(!active)}
        >
            <span></span>
        </button>
    );

    const renderChildren = () => {
        if ( !resizable ) return children;
        else return active ? children : children.slice(0, 8);
    }

    return(
        <div className="filters_group">
            <h3>{ name }</h3>
            <div ref={containerRef}>
                { children && renderChildren() } 
                { resizable && renderButton() }
            </div>
        </div>
    );
}

function Controls({count, reset, apply}) {
    return(
        <div className="product-filters_controls">
            <span>{count} фильтров</span>
            <button id="filters-reset" onClick={reset}>Сбросить</button>
            <button id="filters-apply" onClick={apply}><span>Применить</span></button>
        </div>
    )
}
