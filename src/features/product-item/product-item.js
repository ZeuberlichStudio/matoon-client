import React from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';

import { Tabs, Tab } from 'features/tabs/tabs';
import { ResizableText, ButtonsBlock } from 'features/resizable-containers/containers';

import './product-item.scss';

const { API_URL } = process.env;

export function ProductItemSuggested({data, i}) {
    const {
        id,
        slug,
        variants,
        name,
        shortDescription,
        price
    } = data;

    const image = variants[0].images[0];

    return (
        <div className={`product-item-suggested`} key={ i }>
            <div className="product-item-suggested_image">
                <img src={ API_URL + image } alt={ name }/>
            </div>

            <div className="product-item-suggested_info">
                <div className="product-item-suggested_info_name-and-price">
                    <span>{ price + 'Р' }</span>
                    <h2>{ name }</h2>
                </div>
                <div className="product-item-suggested_info_desc">{ shortDescription }</div>
            </div>

            <div className="product-item-suggested_link">
                <Link to="/"><span>Подробнее</span></Link>
            </div>
        </div>
    );
}

export function ProductItemMini({data, i}) {

    const {
        id,
        slug,
        variants,
        name,
        shortDescription,
        price
    } = data;

    const image = variants[0].images[0];

    const backgroundLocation = useLocation();

    const itemLink = {
        pathname: `/catalog/product=${slug}`,
        state: { backgroundLocation }
    }

    return (
        <div className={`product-item product-item-${ i } product-item-mini`} key={ i }>
            <div className="product-item-mini_image">
                <img src={ API_URL + image } alt={ name }/>
            </div>

            <div className="product-item-mini_share">
                <div className="product-item-mini_share_vk"></div>
                <div className="product-item-mini_share_fb"></div>
                <div className="product-item-mini_share_fav"></div>
            </div>

            <div className="product-item-mini_info">
                <div className="product-item-mini_info_name-and-price">
                    <span>{ price + 'Р' }</span>
                    <h2>{ name }</h2>
                </div>
                <div className="product-item-mini_info_desc">{ shortDescription }</div>
            </div>

            <div className="product-item-mini_link">
                <Link to={itemLink}><span>Подробнее</span></Link>
            </div>
        </div>
    );
}

export function ProductItemMobile({data, i}) {

    const [selectedImage, setSelectedImage] = React.useState(0);

    const {
        id,
        name,
        variants,
        shortDescription,
        price
    } = data;

    const images = variants[0].images;

    const renderImagePreview = (image, i) => (
        <button 
            onClick={ () => setSelectedImage(i) }
            className={selectedImage === i ? 'active' : null}
        >
            <img src={API_URL + image} alt=""/>
        </button>
    );

    return (
        <div className={`product-item product-item-${i} product-item-mobile`} key={ i }>
            <div className="product-item-mobile_images">
                <div className="product-item-mobile_images_selected">
                    <img src={ API_URL + images[selectedImage] } alt=""/>
                </div>
                <div className="product-item-mobile_images_preview">
                    { images.map(renderImagePreview) }
                </div>
            </div>

            <div className="product-item-mobile_info">
                <div className="product-item-mobile_info_name-and-price">
                    <span>{ price + 'P' }</span>
                    <h2>{ name }</h2>
                </div>
                <div className="product-item-mobile_info_desc">{ shortDescription }</div>
            </div>

            <div className="product-item-mobile_link">
                <a href={ id }><span>Подробнее</span></a>
            </div>

            <div className="product-item-mobile_share">
                <div className="product-item-mobile_share_vk"></div>
                <div className="product-item-mobile_share_fb"></div>
                <div className="product-item-mobile_share_fav"></div>
            </div>
        </div>
    );
}

export function ProductItemFull({data, i}) {

    const {
        id,
        variants,
        name,
        sku,
        description,
        specs,
        attributes,
        price,
        meta
    } = data;

    const [selectedVariant, setSelectedVariant] = React.useState(undefined);
    const [selectedImage, setSelectedImage] = React.useState(0);
    const [options, setOptions] = React.useState();
    const [quantity, setQuantity] = React.useState(1);

    function setInitialOptions() {
        const {
            colors,
            brands 
        } = attributes;

        const options = {
            color: colors.length > 1 ? colors[0].name : '',
            brand: brands.length > 1 ? brands[0].name : '',
        };

        setOptions(options);
    }

    function findVariant() {    
        setSelectedVariant(undefined); 
        variants.find((variant, i) => {
            if ( options.color && options.brand ) {
                (variant.color === options.color && variant.brand === options.brand) && setSelectedVariant(i);
            }
            else if ( options.color ) {
                variant.color === options.color && setSelectedVariant(i);
            }
            else if ( options.brand ) {
                variant.brand === options.brand && setSelectedVariant(i);
            }
        });
    }

    React.useEffect(() => {
        if ( !options ) return setInitialOptions();
        else findVariant();
    }, [options, data])

    const renderImagePreview = (image, i) => (
        <button 
            key={i}
            onClick={ () => setSelectedImage(i) }
            className={selectedImage === i ? 'active' : null}
        >
            <img src={API_URL + image} alt=""/>
        </button>
    );

    const renderOption = (option, i, attr) => (
        <button 
            key={i}
            style={option.value && {["--colorData"]: option.value.includes('(255,255,255)'||'#fff') ? '#D2D3D4' : option.value}}
            className={`product-item-full_info_options_block_option ${options[attr] === option.name ? 'active' : null}`}
            onClick={ () => setOptions({...options, [attr]: option.name}) }
        >
            <span>{ option.name }</span>
        </button>
    );

    const renderSpec = (spec, i) => (
        
        <li key={i}>
            <span>{ spec[0] }</span>
            <hr/>
            <span>{ spec[1] }</span>
        </li>
    );

    return (
        <div className={`product-item product-item-${ i } product-item-full`}>
            {
                typeof(selectedVariant) !== 'undefined' ?
                <div className="product-item-full_images">
                    <div className="product-item-full_images_selected">
                        <img src={API_URL + variants[selectedVariant].images[selectedImage]} alt=""/>
                    </div>

                    <div className="product-item-full_images_preview">
                        { variants[selectedVariant].images.map(renderImagePreview) }
                    </div>
                </div>
                :
                <div className="product-item-full_images">
                </div>
            }

            <div className="product-item-full_info">
                <h2 className="product-item-full_info_name">{ name }</h2>

                <div className="product-item-full_info_options">
                    <ButtonsBlock className="product-item-full_info_options_block">
                        { options && attributes.colors.map((option, i) => renderOption(option, i, 'color')) }
                    </ButtonsBlock>
                </div>

                <span className="product-item-full_info_sku-and-stock">
                    <span>Арт: { sku }</span>
                    <span>В наличии: { meta.stock } шт</span>
                </span>

                <div className="product-item-full_info_description-and-specs">
                    <Tabs>
                        <Tab title="Описание">
                            <ResizableText>
                                <p>{ description }</p>
                            </ResizableText>
                        </Tab>
                        <Tab title="Характеристики">
                            <ResizableText>
                                <ul>{ Object.entries(specs).map(renderSpec) }</ul>
                            </ResizableText>
                        </Tab>
                    </Tabs>
                </div>
            </div>

            <div className="product-item-full_price-and-quantity">
                <input placeholder="количество(шт)" type="number" min="1" max={ meta.stock }/>
                <span className="price">{ price * quantity }р</span>
                <span className="per-item">{ price }р/шт</span>
            </div>

            <div className="product-item-full_add-to-cart">
                <button><span>Добавить в корзину</span></button>
            </div>

            <div className="product-item-full_share">
                <div className="product-item-full_share_vk"></div>
                <div className="product-item-full_share_fb"></div>
                <div className="product-item-full_share_fav"></div>
            </div>
        </div>
    );
}