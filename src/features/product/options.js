import React from 'react';
import { useSelector } from 'react-redux';
import ButtonsGroup from '~/features/containers/buttons-group';
import Scrollable from '~/features/containers/scrollable';
import './styles/options.scss';

function Variants({ 
    variants, 
    shown,
    setCurrVar   
}) {
    const [attrMap, setAttrMap] = React.useState([]);
    const [config, setConfig] = React.useState({ color: 0, brand: 0 });

    function generateAttrMap() {
        const attrMap = [];

        variants.forEach(variant => {
            const {color, brand} = variant.attributes;
            const colorIndex = attrMap.findIndex(({_id}) => _id === color._id);

            if ( colorIndex < 0 ) attrMap.push({...color, brands: [brand]});
            else attrMap[colorIndex].brands.push(brand);
        });

        setAttrMap(attrMap);
    }

    function selectColorConfig(index) {
        const newConfig = {
            color: index,
            brand: 0
        }

        setConfig(newConfig);
    }

    function selectBrandConfig(index) {
        setConfig({...config, brand: index});
    }

    //this finds and sets variant index
    //based on current config
    //if it passes validation.
    //runs on config state change.
    function setCurrVarByConfig() {
        if ( attrMap.length === 0 ) return;

        const color = attrMap[config.color];
        const brand = color.brands[config.brand];
        const newVar = variants.findIndex(({attributes}) => (
            attributes.color._id === color._id &&
            attributes.brand._id === brand._id
        ));

        setCurrVar(newVar);
    };

    React.useEffect(generateAttrMap, []);
    React.useEffect(setCurrVarByConfig, [config]);

    return (
        <div className="product-options">
            <AttrSet {...{
                    shown,
                    config: config.color, 
                    attrs: attrMap, 
                    selectConfig: selectColorConfig
                }}
            />
            
            <AttrSet {...{
                    shown,
                    config: config.brand, 
                    attrs: attrMap[config.color]?.brands, 
                    selectConfig: selectBrandConfig
                }}
            />
        </div>
    );
}

function AttrSet({ 
    shown,
    config,
    attrs, 
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
                        attrs.map((attr, i) => 
                            <Attr 
                                key={i}
                                i={i}
                                active={i === config}
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
    code: colorData,
    active, 
    selectConfig,
    i
}) => (
    <button 
        style={{ '--colorData': colorData }}
        className={`attr ${ active ? 'active' : '' }`}
        onClick={() => selectConfig(i)}
    >
        <span>{ name }</span>
    </button>      
);

export default Variants;