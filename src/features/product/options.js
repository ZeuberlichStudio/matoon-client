import React from 'react';
import { useSelector } from 'react-redux';
import ButtonsGroup from 'features/containers/buttons-group';
import Scrollable from 'features/containers/scrollable';
import './styles/options.scss';

function Variants({ 
    //data
    vars, 
    attrMap,
    shown,
    //functions
    setCurrVar   
}) {
    const [config, setConfig] = React.useState({});

    //this finds and sets variant index
    //based on current config
    //if it passes validation.
    //runs on config state change.
    function setCurrVarByConfig() {
        const newVar = vars.findIndex(({ color, brand }) => (
            color === config.color && brand.slug === config.brand
        ));

        setCurrVar(newVar);
    };

    React.useEffect(() => {
        if ( !config.color || !config.brand ) return;
        setCurrVarByConfig();
    }, [config]);

    React.useEffect(() => {
        if ( !attrMap ) return;
        selectColorConfig('red');
    }, []);

    function selectColorConfig( slug ) {
        const newConfig = {
            color: slug,
            brand: attrMap[slug].brands[0]?.slug || ''
        }

        setConfig(newConfig);
    }

    function selectBrandConfig( slug ) {
        setConfig({...config, brand: slug});
    }

    return (
        <div className="product-options">
            <AttrSet {...{
                    shown,
                    config: config.color, 
                    attrs: attrMap && Object.entries(attrMap).map(([k, v]) => v), 
                    selectConfig: selectColorConfig
                }}
            />
            
            <AttrSet {...{
                    shown,
                    config: config.brand, 
                    attrs: attrMap?.[config.color]?.brands, 
                    selectConfig: selectBrandConfig
                }}
            />
        </div>
    );
}

function AttrSet({ 
    //data
    shown,
    config,
    attrs, 
    //functions
    selectConfig
}) {

    const targetDevice = useSelector( state => state.device.target );

    const Wrapper = ({children}) => (
        targetDevice === 'desktop' ? 
        <ButtonsGroup {...{shown}}>{children}</ButtonsGroup> : 
        <Scrollable>{children}</Scrollable>
    );

    return (
        <div className="product-options_attr-set">
            { 
                attrs &&
                <Wrapper> 
                    {
                        attrs.map( attr => 
                            <Attr 
                                key={attr.slug}
                                active={config === attr.slug}
                                {...{...attr, selectConfig}}
                            /> 
                        ) 
                    }
                </Wrapper>
            }
        </div>
    );
}

const Attr = ({ 
    name, 
    slug,
    value: colorData,
    active, 
    selectConfig 
}) => (
    <button 
        style={{ '--colorData': colorData }}
        className={`attr ${ active ? 'active' : '' }`}
        onClick={() => selectConfig(slug)}
    >
        <span>{ name }</span>
    </button>      
);

export default Variants;