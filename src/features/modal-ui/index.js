import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'features/new-modal';
import { setModalElement, animateModalElement } from 'app/ui';
import Menu from 'features/categories';
import Favourite from 'features/favourite';

function ModalUI() {

    const modalElement = useSelector( ({ui}) => ui.modalElement ); 
    const dispatch = useDispatch();
    const contentRef = React.useRef();

    const animation = 
        modalElement === 'menu' ? 'slideFromLeft' :
        modalElement === 'favourite' ? 'slideFromRight' :
        'scale';

    return (
        <Modal 
            {...{ ref: contentRef, navFocus: true, animation }}
            closeCallback={ () => toggleUI( dispatch, setModalElement, modalElement, modalElement ) }
        >
            { 
                modalElement === 'menu' ? <Menu/> : 
                modalElement === 'favourite' ? <Favourite/> : 
                <div></div> 
            }
        </Modal>
    );
}

function toggleUI( dispatch, actionSet, modalElement, payload ) {
    switch (modalElement) {
        case payload:
            dispatch(actionSet(false));
            break;

        case null:
            dispatch(actionSet(payload));
            break;

        default:
            dispatch(actionSet(payload));
            // trying to animate before changing content
            // if ( actionAnimate && timeout ) {
            //     function animatedToggle() {
            //         dispatch(actionSet(payload));
            //         dispatch(actionAnimate(false));
            //     }

            //     dispatch(actionAnimate(true));
            //     setTimeout( animatedToggle, 200 );
            // } else {
            //     dispatch(actionSet(payload));
            // }
            break;
    }
}

export { toggleUI };
export default ModalUI;