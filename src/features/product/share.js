import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem } from 'features/favourite/favSlice';
import './styles/share.scss'

function ProductShare({ slug }) {

    const marked = useSelector( state => state.favourite ).includes(slug);
    const dispatch = useDispatch();

    const favAdd = () => dispatch(addItem(slug));;
    const favRemove = () => dispatch(removeItem(slug));;

    return (
        <div className="product-share">
            <a className="product-share_vk" href="/vk"></a>
            <a className="product-share_fb" href="/fb"></a>
            <button 
                className={`product-share_fav ${ marked ? 'marked' : '' }`} 
                onClick={ !marked ? favAdd : favRemove }
            />
        </div>
    );
}

export default ProductShare;