import React from 'react';
import apiCall from '~/common/api-call';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setModalElement, toggleOverlay, toggleSearch } from '~/app/ui';
import { selectTarget } from '~/app/device';
import { toggleUI } from '~/features/modal-ui';

import SearchItem from './search-item';
import './styles/search.scss';

function Search({ mini, focusCallback, catSlug }) {

    const history = useHistory();
    const dispatch = useDispatch();
    const [string, setString] = React.useState('');
    const [results, setResuts] = React.useState([]);
    const [status, setStatus] = React.useState('idle');
    const limit = 3;
    const target = useSelector(selectTarget);
    const [focus, setFocus] = React.useState(false);
    const uiState = useSelector( state => state.ui );
    const inputRef = React.useRef();
    const [searchPagePath, setSearchPagePath] = React.useState('/catalog/search=');

    function fetchResult() {
        setStatus('pending');

        apiCall(`products?sort=name,1&limit=${limit}&catSlug=${catSlug || ''}&search=${string.replace(' ', '%20')}`)
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
    }, [string]);

    React.useEffect(() => {
        setSearchPagePath(`/catalog/search=${string}${catSlug ? `?catSlug=${catSlug}` : ''}`);
    }, [string, catSlug]);

    function fieldHandler(e) {
        const newString = e.target.value;
        setString(newString);
    }

    function focusHandler() {
        if (!focus && !uiState.search) {
            setFocus(true);
            if ( target === 'mobile' ) return;
            dispatch(toggleOverlay(true));
            focusCallback && focusCallback();
        }
    }

    React.useEffect(() => {
        if ( !focus ) inputRef.current.blur();
    }, [focus]);

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

    const modalElement = useSelector( ({ui}) => ui.modalElement );
    function menuRedirect() {
        toggleUI( dispatch, setModalElement, modalElement, 'menu' )
        setFocus(false);
        setOpen(false);
    }

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

    function handleEnterKey(e) {
        if ( e.keyCode == 13 ) {
            close();
            history.push(searchPagePath);
        }
    }

    return (
        <div className={`search ${ mini ? 'mini' : '' } ${ focus ? 'focus' : '' }`} onClick={ focusHandler }>
            <div className="search-field">
                <input 
                    ref={inputRef}
                    placeholder={ catSlug ? 'Поиск по категории' : 'Поиск' } 
                    type="text" 
                    value={ string } 
                    onChange={ fieldHandler }
                    onKeyUp={handleEnterKey}
                />
                <button id="search-reset" onClick={close}/>
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

            { 
                open && 
                results[0] && 
                <Link onClick={ close } to={searchPagePath} className="search-more">
                    <span>Все результаты поиска</span>
                </Link>
            }
        </div>
    );
}

export const ModalSearch = React.forwardRef(function ModalSearch(props, ref) {
    const targetDevice = useSelector(selectTarget);
    
    //fixes scrollability on ios < 14
    const mobileScrollableStyle = { 
        overflowX: 'hidden', 
        overflowY: 'scroll', 
        '-webkit-overflow-scrolling': 'touch',
        '-webkit-mask-image': '-webkit-radial-gradient(white, black)',
        maskImage: 'radial-gradient(white, black)'
    }

    return (
        <div id="modal_search" className="modal_search" ref={ref}>
            <div style={targetDevice == 'mobile' ? mobileScrollableStyle : null} className="search_wrapper">
                <Search />
            </div>
        </div>
    )
});

export default Search;