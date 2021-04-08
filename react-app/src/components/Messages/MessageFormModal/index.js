import React, { useState } from 'react';
import { Modal } from '../../../context/ModalAuthContext';
import MessageFormForModal from './MessageFormForModal';

const MessageFormModal = ({receiver}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
        <button onClick={() => setShowModal(true)}>Message the teacher!</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
            <MessageFormForModal
                receiver={receiver}
                setShowModal={setShowModal}
            />
            </Modal>
        )}
    </>
  );
}

export default MessageFormModal;