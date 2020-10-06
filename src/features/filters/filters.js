import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterChanged } from 'features/products/querySlice';

import Checkbox from './checkbox';
import Field from './field';

import './filters.scss';

export default function Filters({ catSlug }) {

    const {
        API_URL
    } = process.env;

    const initialSelectedFilters = {
        color: [],
        brand: [],
        material: [],
        sex: [],
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

    function buildApiQuery() {

        const params =  {
            cat: catSlug,
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

        fetch(`${API_URL}/products/available-filters?${buildApiQuery()}`)
            .then( data => data.json() )
            .then( result => {
                setAvailableFilters(result);
                setStatus('succeeded');
            })
            .catch( err => {
                setError(err);
                setStatus('failed');
            });

    }, [fresh, apiQueryParamsState]);

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
        console.log(apiQueryParamsState.filter);
        for ( let [field, value] of Object.entries(apiQueryParamsState.filter) ) {
            count += Array.isArray(value) ? value.length : (value ? 1 : 0);
        }

        return count;
    }

    function reset() {
        setSelectedFilters(initialSelectedFilters);
        setFresh(true);
    }

    function apply() {
        dispatch(filterChanged(selectedFilters));
    }

    const renderCheckbox = (filter, attr, key) => 
    <Checkbox active={selectedFilters[attr].includes(filter.name)} key={key} {...filter} attr={attr} fresh={fresh} addFilter={addFilter} removeFilter={removeFilter}/>;

    const renderField = (name, attr) => 
    <Field key={name} name={name} attr={attr} fresh={fresh} setFilter={setFilter}/>;

    const {
        color,
        brand,
        material,
        sex
    } = availableFilters;

    return(
        <div ref={ containerRef } id="product-filters" className="product-filters">
            <h2>Фильтры</h2>
            <ResizableFilterBlock name={"Цвет"}>
                { color && color.map((filter, i) => renderCheckbox(filter, "color", i)) }
            </ResizableFilterBlock>

            <ResizableFilterBlock name={"Логотип на товаре / бренд"}>
                { brand && brand.map((filter, i) => renderCheckbox(filter, "brand", i)) }
            </ResizableFilterBlock>

            <ResizableFilterBlock name={"Материалы"}>
                { material && material.map((filter, i) => renderCheckbox(filter, "material", i)) }
            </ResizableFilterBlock>

            <ResizableFilterBlock name={"Пол / возраст"}>
                { sex && sex.map((filter, i) => renderCheckbox(filter, "sex", i)) }
            </ResizableFilterBlock>

            <FilterBlock name={"Цена (за шт)"}>
                { renderField("От", "minPrice") }
                { renderField("До", "maxPrice") }
            </FilterBlock>

            <FilterBlock name={"Наличие (шт)"}>
                { renderField("От", "minStock") }
            </FilterBlock>

            <Controls apply={apply} reset={reset} count={countApplied()} />
        </div>
    );
}

function FilterBlock({name, children}) {
    return(
        <div className="product-filters_block">
            <h3>{ name }</h3>
            <div>{ children } </div>
        </div>
    );
}

function ResizableFilterBlock({name, children}) {

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
        <div className="product-filters_block product-filters_block-resizable">
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