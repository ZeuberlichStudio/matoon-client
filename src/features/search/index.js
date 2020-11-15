import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleOverlay, toggleMenu, toggleSearch } from 'app/ui';
import SearchItem from './search-item';
import './styles/search.scss';

const { API_URL } = process.env;

function Search({ mini, focusCallback, cat }) {

    const dispatch = useDispatch();

    const [string, setString] = React.useState('');

    const [results, setResuts] = React.useState([]);
    const [status, setStatus] = React.useState('idle');
    const [error, setError] = React.useState(null);

    const limit = 3;

    function fetchResult() {
        fetch( API_URL + `products?search=${ string }&sort=name,1&limit=${ limit }&cat=${ cat ? 'cat' : '' }` )
            .then(data => data.json())
            .then(results => {
                setResuts(results);
                setStatus('succeeded');
            })
            .catch(err => {
                setStatus('failed');
                setError(err);
            });
    }

    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        if ( string && string.length > 1 ) {
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

    const [focus, setFocus] = React.useState(false);
    const uiState = useSelector( state => state.ui );

    function focusHandler() {
        if (!focus && !uiState.search) {
            setFocus(true);
            dispatch(toggleOverlay(true));
            focusCallback && focusCallback();
        }
    }

    React.useEffect(() => {
        if ( uiState.search ) return;

        function escapeHandler(e) {
            const closest = e.target.closest('.search');
            const isUiRedirect = e.target.id === 'menu-redirect';

            console.log( e.target.id )

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

    function menuRedirect() {
        dispatch(toggleMenu(true));
        setFocus(false);
        setOpen(false);
        setString('');
        !uiState.search && dispatch(toggleOverlay(false));
        uiState.search && dispatch(toggleSearch(false));
    }

    function close() {
        setFocus(false);
        setOpen(false);
        setString('');
        !uiState.search && dispatch(toggleOverlay(false));
        uiState.search && dispatch(toggleSearch(false));
    }

    return (
        <div className={`search ${ mini ? 'mini' : '' } ${ focus ? 'focus' : '' }`} onClick={ focusHandler }>
            <div className="search-field">
                <input placeholder={ cat ? 'Поиск по категории' : 'Поиск' } type="text" value={ string } onChange={ fieldHandler }/>
                { focus && <button id="search-reset" onClick={ () => setFocus(false) }/> }
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

export default Search;