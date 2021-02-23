import React from 'react';

export default function Checkbox({
    active = false,
    name, 
    slug,
    attr, 
    value, 
    addFilter, 
    removeFilter, 
    fresh
}) {

    //const [active, setActive] = React.useState(active);

    //React.useEffect(() => { fresh && setActive(false) }, [fresh]);

    function onChangeHandler(e) {
        !active ? addFilter(attr, slug) : removeFilter(attr, slug); 
    }

    return (
        <label 
            style={ value && {["--colorData"]: value.includes('(255,255,255)'||'#fff') ? '#D2D3D4' : value} }
            className={`product-grid_filters_filter checkbox-filter ${ active ? 'active' : null }`}
        >
            <span>{ name }</span>
            <input 
                checked={active}
                onChange={ onChangeHandler } 
                data-attr={attr} 
                data-value={slug}
                type="checkbox"
            />
        </label>
    );
}