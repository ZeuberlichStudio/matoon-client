import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '~/features/new-modal';
import { setModalElement, animateModalElement } from '~/app/ui';
import Menu from '~/features/categories';
import Favourite from '~/features/favourite';
import Cart from '~/components/Cart/Cart';
import {ModalSearch} from '~/features/Search';

function ModalUI() {

    const modalElement = useSelector( ({ui}) => ui.modalElement ); 
    const dispatch = useDispatch();
    const contentRef = React.useRef();

    const animation = 
        modalElement === 'menu' ? 'slideFromLeft' :
        modalElement === ('favourite' || 'cart') ? 'slideFromRight' :
        'scale';

    return (
        <Modal 
            {...{ ref: contentRef, navFocus: true, animation }}
            closeCallback={ () => toggleUI( dispatch, setModalElement, modalElement, modalElement ) }
        >
            { 
                modalElement === 'menu' ? <Menu/> : 
                modalElement === 'favourite' ? <Favourite/> : 
                modalElement === 'cart' ? <Cart/> : 
                modalElement === 'search' ? <ModalSearch/> : 
                <div></div> 
            }
        </Modal>
    );
}

function toggleUI( dispatch, actionSet, modalElement, payload ) {
    switch (modalElement) {
        case payload:
            dispatch(actionSet(null));
            break;

        case null:
            dispatch(actionSet(payload));
            break;

        default:
            dispatch(actionSet(payload));
            break;
    }
}

export { toggleUI };
export default ModalUI;