import React from 'react';
import './styles/options/pc.scss';

function OptionsList({
    title,
    groups,
    optionCallback,
    handleDetails
}) {

    const [currGroup, setCurrGroup] = React.useState(null);

    function selectGroup(idx) {
        setCurrGroup(idx);
    }

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
                            {...{...group, optionCallback}}
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
    defaultOption,
    selectGroup,
    globalDetailsComponent,
    optionCallback,
    handleDetails,
    active
}) {

    const [currOption, setCurrOption] = React.useState(null);

    React.useEffect(() => defaultOption && setCurrOption(0), []);

    function selectOption(idx) {
        selectGroup();
        setCurrOption(idx);
        optionCallback(options[idx].name);
    }

    React.useEffect(() => {
        if (!active && !defaultOption) setCurrOption(null);
    }, [active]);

    return (
        <div className={`cart-options-group ${active ? 'active' : ''}`}>
            <h4>{title}</h4>

            <div className="cart-options-group_options">
                { 
                    options?.map((option, i) => (
                        <Option 
                            key={i} 
                            active={currOption === i}
                            onClick={() => selectOption(i)} 
                            {...option}
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
    active,
    onClick
}) => (
    <button 
        style={{ '--colorData': colorData || null }} 
        className={`cart-option ${active ? 'active' : ''}`}
        onClick={onClick}
    >
        <span>{name}</span>
    </button>
)

export default OptionsList;