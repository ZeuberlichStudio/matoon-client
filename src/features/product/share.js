import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem } from '~/features/favourite/favSlice';
import './styles/share.scss'

function ProductShare({ id }) {
    const link = `https://matoon.store/catalog/product=${id}`;
    const marked = useSelector( state => state.favourite ).includes(id);
    const dispatch = useDispatch();

    const favAdd = () => dispatch(addItem(id));
    const favRemove = () => dispatch(removeItem(id));

    return (
        <div className="product-share">
            <a 
                className="product-share_vk" 
                href={`https://vk.com/share.php?url=${link}`} 
                target="_blank"
            />
            <a 
                className="product-share_fb" 
                href={`https://www.facebook.com/sharer/sharer.php?u=${link}`} 
                target="_blank"
            />
            <button 
                className={`product-share_fav ${ marked ? 'marked' : '' }`} 
                onClick={ !marked ? favAdd : favRemove }
            />
        </div>
    );
}

export default ProductShare;