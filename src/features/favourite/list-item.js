import React from 'react';
import { ProductShare } from '~/features/product';
import './styles/list-item.scss';

const { API_URL } = process.env;
const { CDN_URL } = process.env;

function FavouriteListItem({ item, setProduct, setColumn }) {

    const { 
        name, 
        slug,
        images,
        sku, 
        prices 
    } = item;

    const formFullPath = path => CDN_URL + path;

    function openProduct() {
        setProduct(item);
        setColumn(1);
    }

    return (
        <div className="favourite-list-item">
            <div className="favourite-list-item_image">
                <img src={formFullPath(images[0])} alt=""/>   
            </div>
            <h2 className="favourite-list-item_name">{ name }</h2>
            <span className="favourite-list-item_sku">{ `Арт: ${sku}` }</span>
            <span className="favourite-list-item_price">{ `${prices[0].amount}₽/шт` }</span>

            <button onClick={openProduct} className="favourite-list-item_more">
                <span>Открыть товар</span>
            </button>
            <ProductShare {...{slug}}/>
        </div>
    );
}

export default FavouriteListItem;