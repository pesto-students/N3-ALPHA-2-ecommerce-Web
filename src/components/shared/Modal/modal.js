import React from 'react';
import ModalBox from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

const Modal = (props) => {
    const {
        openModal = false,
        onCloseModal,
        modalClass = '',
        overlayClass = '',
    } = props;
    return (
        <ModalBox
            open={openModal}
            onClose={onCloseModal}
            blockScroll={false}
            classNames={{ modal: modalClass, overlay: overlayClass }}
        >
            {props.children}
        </ModalBox>
    );
};

export default Modal;
