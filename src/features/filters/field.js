import React from 'react';

export default function Field({
    name, 
    attr, 
    setFilter,
    fresh
}) {

    const [value, setValue] = React.useState('');

    React.useEffect(() => { fresh && setValue('') }, [fresh]);

    function onChangeHandler(e) {
        setValue(e.target.value);
        setFilter({ [attr]: parseFloat(e.target.value) });
    }

    return (
        <label className={`product-grid_filters_filter field-filter`}>
            <input 
                value={value} 
                type="text" 
                placeholder={name}
                data-attr={attr} 
                onChange={ onChangeHandler }
            />
        </label>
    );
}