import React from 'react';
import apiCall from '~/common/api-call';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setModalElement, toggleOverlay, toggleSearch } from '~/app/ui';
import { selectTarget } from '~/app/device';
import { toggleUI } from '~/features/modal-ui';

import SearchItem from './search-item';
import './styles/search.scss';

function Search({ mini, focusCallback, catSlug }) {

    const dispatch = useDispatch();

    const [string, setString] = React.useState('');

    const [results, setResuts] = React.useState([]);
    const [status, setStatus] = React.useState('idle');

    const limit = 3;

    function fetchResult() {
        setStatus('pending');

        apiCall(`products?sort=name,1&limit=${limit}&catSlug=${catSlug ?? ''}&search=${string.replace(' ', '%20')}`)
            .then(result => {
                setResuts(result.data);
                setStatus('success');
            })
            .catch(err => {
                setStatus('failed');
                console.error(err);
            });
    }

    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if ( string && string.length > 2 ) {
            fetchResult();
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [string, limit]);

    function fieldHandler(e) {
        const newString = e.target.value;
        setString(newString);
    }

    //focus

    const target = useSelector(selectTarget);
    const [focus, setFocus] = React.useState(false);
    const uiState = useSelector( state => state.ui );

    function focusHandler() {
        if (!focus && !uiState.search) {
            setFocus(true);
            if ( target === 'mobile' ) return;
            dispatch(toggleOverlay(true));
            focusCallback && focusCallback();
        }
    }

    React.useEffect(() => {
        if ( uiState.search ) return;

        function escapeHandler(e) {
            const closest = e.target.closest('.search');
            const isUiRedirect = e.target.id === 'menu-redirect';

            if ( !closest && !isUiRedirect ) {
                setFocus(false);
                setOpen(false);
                setString('');
                dispatch(toggleOverlay(false));
            }
        }

        focus && window.addEventListener( 'click', escapeHandler );   
        return () => window.removeEventListener( 'click', escapeHandler );
    }, [focus, uiState.search]);

    // function menuRedirect() {
    //     dispatch(toggleMenu(true));
    //     setFocus(false);
    //     setOpen(false);
    //     setString('');
    //     !uiState.search && dispatch(toggleOverlay(false));
    //     uiState.search && dispatch(toggleSearch(false));
    // }
    const modalElement = useSelector( ({ui}) => ui.modalElement );
    const menuRedirect = () => toggleUI( dispatch, setModalElement, modalElement, 'menu' );


    function close() {
        if ( target === 'mobile' ) {
            toggleUI( dispatch, setModalElement, modalElement, 'search' );
        } else {
            setFocus(false);
            setOpen(false);
            setString('');
            !uiState.search && dispatch(toggleOverlay(false));
            uiState.search && dispatch(toggleSearch(false));
        }
    }

    return (
        <div className={`search ${ mini ? 'mini' : '' } ${ focus ? 'focus' : '' }`} onClick={ focusHandler }>
            <div className="search-field">
                <input placeholder={ catSlug ? 'Поиск по категории' : 'Поиск' } type="text" value={ string } onChange={ fieldHandler }/>
                { focus && <button id="search-reset" onClick={close}/> }
            </div>

            {
                open && 
                (
                    results[0] ?
                    <div className="search-results">
                        <h3>Результаты поиска:</h3>
                        { results.map( ( data, i ) => <SearchItem {...{ data, close, key: i }}/> ) }
                    </div> :
                    <div className="search-results nothing-found">
                        <h3>К сожалению, мы ничего не нашли по вашему запросу…</h3>
                        <p>
                            Но вы можете попробовать ввести другой
                            запрос или посмотреть что-нибудь в нашем&nbsp;
                            <button id="menu-redirect" onClick={ menuRedirect }>меню-категорий</button>
                        </p>
                    </div>
                )
            }

            { open && results[0] && <SearchMore query={ string } close={ close }/> }
        </div>
    );
}

function SearchMore({ query, close }) {
    return (
        <Link onClick={ close } to={`/catalog/search=${query}`} className="search-more">
            <span>Все результаты поиска</span>
        </Link>
    );
}

export const ModalSearch = React.forwardRef((props, ref) => (
    <div id="modal_search" className="modal_search" ref={ref}>
        <div className="search_wrapper">
            <Search />
        </div>
    </div>
));

export default Search;