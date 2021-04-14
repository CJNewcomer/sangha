import React, {useState} from 'react';
import {Modal} from '../../../context/ModalAuthContext';
import MessageFormModal from './MessageFormModal';

export default function MessageModal({receiver}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='profile__button' onClick={() => setShowModal(true)}>
                <i class="fas fa-comment">Message the teacher!</i>
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <MessageFormModal
                        receiver={receiver}
                        setShowModal={setShowModal} 
                    />
                </Modal>
            )}
        </>
    );
}