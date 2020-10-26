import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import ButtonsGroup from 'features/containers/buttons-group';
import Scrollable from 'features/containers/scrollable';

import './styles/options.scss';

export default function ProductOptions({ attributes, shown, config, setConfig }) {
    return (
        <div className="product-options">
            { 
                Object.entries( attributes ).map( ([title, options], i) =>
                    options.length > 1 && <AttributeBlock key={ i } {...{attr: title, options, shown, config, setConfig}}/>
                ) 
            }
        </div>
    );
}

function AttributeBlock({ attr, options, shown, config, setConfig }) {

    const targetDevice = useSelector( state => state.device.target );

    return (
        <div className="product-options_attribute-block">
            {
                targetDevice === 'desktop' ?
                <ButtonsGroup shown={ shown }>
                    { options.map( (option, i) => <Option {...{attr, option, i, config, setConfig}}/> ) }
                </ButtonsGroup>
                :
                <Scrollable>
                    { options.map( (option, i) => <Option {...{attr, option, i, config, setConfig}}/> ) }
                </Scrollable>
            }
        </div>
    );
}

function Option({ attr, option, i, currentOption, config, setConfig }) {

    const attrSingular = attr.slice(0, -1);

    const style = {
        "--colorData": /*option.colorData*/ option.value
    };

    return (
        <button 
            className={ `product-option ${ config[attrSingular] === option.name ? 'active' : '' }` } 
            style={ style }
            onClick={ () => setConfig({...config, [attrSingular]: option.name }) }
        >
            <span>{ option.name }</span>
        </button>
    );
}