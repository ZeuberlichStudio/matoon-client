import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModalElement, toggleOverlay, toggleSearch } from 'app/ui';
import ListItem from './list-item';
import './styles/list.scss';
import { toggleUI } from 'features/modal-ui';

const { API_URL } = process.env;

function FavouriteList({ closeButton, setProduct, setColumn }) {

    const dispatch = useDispatch();
    const itemSlugs = useSelector( ({ favourite }) => favourite );
    const [data, setData] = React.useState([]);
    const [status, setStatus] = React.useState('idle');
    const [error, setError] = React.useState(null);

    function generateQuery() {
        const query = itemSlugs.reduce( (acc, next) => `${acc},${next}` );
        return query;
    }

    React.useEffect(() => {
        if ( !itemSlugs[0] ) {
            setData([]);
        } else {
            const endpoint = `${API_URL}products/slug=${generateQuery()}`;

            fetch(endpoint)
                .then( data =>  data.json() )
                .then( result => {
                    setStatus('succeeded');
                    setData(result);
                    console.log(result);
                })
                .catch( err => {
                    setStatus('failed');
                    setError(err);
                });
        }
    }, [itemSlugs]);

    return(
        <div className="favourite-list">
            <div className="favourite-list_header">
                <span>Избранные товары</span>
                { closeButton }
            </div>
            { 
                itemSlugs[0] ?
                data[0] ?
                <>
                    <div className="favourite-list_items">                    
                        { data.map( ( item, i ) => <ListItem key={i} {...{item, setProduct, setColumn}}/> ) }
                    </div>
                    <button className="favourite-list_more">
                        <span>Открыть полный список</span>
                    </button>
                </> : 
                null :
                <FavouriteListEmpty/>
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