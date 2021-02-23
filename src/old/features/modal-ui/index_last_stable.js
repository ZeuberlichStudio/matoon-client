import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'features/new-modal';
import { setModalElement, animateModalElement } from 'app/ui';
import Menu from 'features/categories';
import Favourite from 'features/favourite';

function ModalUI() {

    const modalElement = useSelector( ({ui}) => ui.modalElement ); 
    const modalElementAnimating = useSelector( ({ui}) => ui.modalElementAnimating ); 
    const dispatch = useDispatch();
    const contentRef = React.useRef();

    const animation = 
        modalElement === 'menu' ? 'slideFromLeft' :
        modalElement === 'favourite' ? 'slideFromRight' :
        'scale';

    return (
        modalElement &&
        <Modal 
            {...{ ref: contentRef, navFocus: true, animation }}
            closeCallback={ () => toggleUI( dispatch, setModalElement, modalElement, modalElement ) }
            hide={modalElementAnimating}
        >
            { 
                modalElement === 'menu' ? <Menu/> : 
                modalElement === 'favourite' ? <Favourite/> : 
                null 
            }
        </Modal>
    );
}

function toggleUI( dispatch, actionSet, actionAnimate, modalElement, payload, timeout ) {
    switch (modalElement) {
        case payload:
            dispatch(actionSet(false));
            break;

        case null:
            dispatch(actionSet(payload));
            break;

        default:
            if ( actionAnimate && timeout ) {
                function animatedToggle() {
                    dispatch(actionSet(payload));
                    dispatch(actionAnimate(false));
                }

                dispatch(actionAnimate(true));
                setTimeout( animatedToggle, 200 );
            } else {
                dispatch(actionSet(payload));
            }
            break;
    }
}

export { toggleUI };
export default ModalUI;