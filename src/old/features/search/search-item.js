import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles/search-item.scss';

const { API_URL } = process.env;
const { CDN_URL } = process.env;
const formFullPath = path => CDN_URL + path;

function SearchItem({ data, close }) {

    const {
        name,
        slug,
        images,
        sku,
        variants,
        attributeMap: attrMap,
        prices
    } = data;

    const thumbnail = variants[0].images[0];

    const backgroundLocation = useLocation();

    const itemLink = {
        pathname: `/catalog/product=${ slug }`,
        state: { backgroundLocation }
    };

    return (
        <Link className="search-item" to={ itemLink } onClick={ close }>
            <div className="search-item_thumbnail">
                <img src={formFullPath(images[0])} alt={ name }/>
            </div>

            <h2 className="search-item_name">{ name }</h2>
            <span className="search-item_sku">{ `Арт: ${ sku }` }</span>

            <ul className="search-item_colors">
                <span>Цвета:</span>
                { Object.entries(attrMap).map( ([key, {value}]) => <li style={{ backgroundColor: value }}></li> ) }
            </ul> 

            <span className="search-item_price">{ `${prices[0].amount}Р/шт` }</span>
        </Link>
    );
}

export default SearchItem;