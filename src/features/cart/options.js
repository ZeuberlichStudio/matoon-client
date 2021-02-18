import React from 'react';
import './styles/options/pc.scss';

function OptionsList({
    title,
    groups
}) {

    const [currGroup, setCurrGroup] = React.useState(null);
    const selectGroup = (i) => setCurrGroup(i);

    return (
        <div className="cart-options">
            <h3>{title}</h3>

            <div className="cart-options_list">
                {
                    groups.map((group, i) => (
                        <OptionsGroup 
                            key={i} 
                            active={currGroup === i} 
                            selectGroup={() => selectGroup(i)}
                            {...group}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export function OptionsGroup({
    title,
    options,
    selectGroup,
    globalDetailsComponent,
    optionsCallback,
    active
}) {
    const [currOption, setCurrOption] = React.useState(null);

    React.useEffect(() => { selectGroup && currOption != null && selectGroup() }, [currOption]);
    React.useEffect(() => () => { active && setCurrOption(null) }, [active]);

    return (
        <div className={`cart-options-group ${active ? 'active' : ''}`}>
            <h4>{title}</h4>

            <div className="cart-options-group_options">
                { 
                    options?.map((option, i) => (
                        <Option 
                            key={option.name} 
                            active={currOption === i}
                            selectOption={() => setCurrOption(i)}
                            {...{...option, optionsCallback}}
                        />
                    )) 
                }
            </div>

            <div className="cart-options-group_option-details">
                {currOption != null && (options[currOption]?.detailsComponent || globalDetailsComponent)}
            </div>
        </div>
    );
}

export const Option = ({
    name,
    colorData,
    payload,
    active,
    default: isDefault,
    selectOption,
    optionsCallback,
    dependancy
}) => {

    function optionHandler() {
        selectOption();
        optionsCallback && optionsCallback(payload);
    }

    React.useEffect(() => { isDefault && optionHandler() }, [isDefault]);

    React.useEffect(() => { 
        active && 
        dependancy && 
        optionsCallback(payload) 
    }, [dependancy]);

    return (
        <button 
            style={{ '--colorData': colorData || null }} 
            className={`cart-option ${active ? 'active' : ''}`}
            onClick={optionHandler}
        >
            <span>{name}</span>
        </button>
    )
}

export default OptionsList;