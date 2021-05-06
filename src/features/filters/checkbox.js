import React from 'react';

export default function Checkbox({
    active = false,
    name, 
    _id,
    attr, 
    code, 
    addFilter, 
    removeFilter, 
    fresh
}) {
    function onChangeHandler(e) {
        !active ? addFilter(attr, _id) : removeFilter(attr, _id); 
    }

    return (
        <label 
            style={code && {["--colorData"]: code}}
            className={`product-grid_filters_filter checkbox-filter ${active ? 'active' : ''}`}
        >
            <span>{ name }</span>
            <input 
                checked={active}
                onChange={ onChangeHandler } 
                data-attr={attr} 
                data-value={_id}
                type="checkbox"
            />
        </label>
    );
}