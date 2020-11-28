import React from 'react';
import Modal from 'features/new-modal';
import Favourite from 'features/favourite';

const { API_URL } = process.env;

export default function DevPage() {

  const modalRef = React.useRef();

  return (
    <Modal {...{ ref: modalRef }}>
      <Favourite/>
    </Modal>
  );
}