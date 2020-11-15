import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem } from 'features/favourite/favSlice';
import './styles/share.scss'

function ProductShare({ id, slug }) {

    const marked = useSelector( state => state.favourite ).includes(id);
    const dispatch = useDispatch();

    const favAdd = () => dispatch(addItem(id));;
    const favRemove = () => dispatch(removeItem(id));;

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