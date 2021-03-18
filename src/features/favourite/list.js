import React from 'react';
import apiCall from '~/common/api-call';
import { SpinningLoader as Loader } from '~/components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { setModalElement, toggleOverlay, toggleSearch } from '~/app/ui';
import ListItem from './list-item';
import './styles/list.scss';
import { toggleUI } from '~/features/modal-ui';

function FavouriteList({ closeButton, setProduct, setColumn }) {

    const dispatch = useDispatch();
    const items = useSelector( ({ favourite }) => favourite );
    const [data, setData] = React.useState([]);
    const [status, setStatus] = React.useState('idle');
    const [error, setError] = React.useState(null);

    function fetchProducts() {
        setStatus('pending');

        apiCall(`products?id=${items.reduce( (acc, next) => `${acc},${next}` )}`)
            .then(result => {
                setStatus('success');
                setData(result.data);
                console.log(result.data);
            })
            .catch( err => {
                setStatus('failed');
                setError(err);
            });
    }

    React.useEffect(() => items[0] && fetchProducts(), [items]);

    return(
        <div className="favourite-list">
            <div className="favourite-list_header">
                <span>Избранные товары</span>
                { closeButton }
            </div>
            { 
                items.length === 0 ? <FavouriteListEmpty /> :
                status === 'success' ?
                <>
                    <div className="favourite-list_items">                    
                        { data.map( ( item, i ) => <ListItem key={i} {...{item, setProduct, setColumn}}/> ) }
                    </div>
                    <button className="favourite-list_more">
                        <span>Открыть полный список</span>
                    </button>
                </> : <Loader />
            }
        </div>
    );
}

function FavouriteListEmpty() {
    const dispatch = useDispatch();
    const modalElement = useSelector( ({ui}) => ui.modalElement );

    const menuRedirect = () => toggleUI( dispatch, setModalElement, modalElement, 'menu' );

    return (
        <div className="favourite-list-empty">
            <h3>У вас пока нет товаров, <br className="pc-hide"/> добавленных в избранное</h3>
            <p>
                Но вы непременно найдёте что-то интересное в&nbsp;
                <button onClick={ menuRedirect }>меню-категорий</button>!
            </p>
        </div>
    )
};

export default FavouriteList;