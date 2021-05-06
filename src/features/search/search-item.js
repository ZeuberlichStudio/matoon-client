import React from 'react';
import Image from '~/components/Image';
import { Link, useLocation } from 'react-router-dom';
import './styles/search-item.scss';

const {STATIC_SOURCE} = process.env;

function SearchItem({ data, close }) {

    const {
        name,
        slug,
        images,
        sku,
        variants,
        prices
    } = data;

    const imageSrc = variants[0].images[0]?.path ? `${STATIC_SOURCE}${variants[0].images[0]?.path}` : '';

    const backgroundLocation = useLocation();

    const itemLink = {
        pathname: `/catalog/product=${ slug }`,
        state: { backgroundLocation }
    };

    const colors = variants
        .map(({attributes}) => attributes.color)
        .filter((el, i, arr) => {
            return arr.findIndex(({_id}) => _id === el._id ) === i;
        })
        .sort((curr, next) => {
            if ( curr.code > next.code ) return 1;
            else if ( curr.code < next.code ) return -1;
            else return 0;
        });

    return (
        <Link className="search-item" to={ itemLink } onClick={ close }>
            <div className="search-item_thumbnail">
                <Image src={imageSrc}/>
            </div>

            <h2 className="search-item_name">{ name }</h2>
            <span className="search-item_sku">{ `Арт: ${ sku }` }</span>

            <ul className="search-item_colors">
                <span>Цвета:</span>
                { 
                    colors.map(color => (
                        <li style={{ 
                                backgroundColor: color.code, 
                                border: color.code.includes('#FFF') && '1px solid black'
                            }}
                        ></li>
                    )) 
                }
            </ul> 

            <span className="search-item_price">{ `${prices[0].amount}Р/шт` }</span>
        </Link>
    );
}

export default SearchItem;