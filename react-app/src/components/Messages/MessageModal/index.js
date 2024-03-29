import {useState} from 'react';
import {Modal} from '../../../context/ModalAuthContext';
import MessageFormModal from './MessageFormModal';

export default function MessageModal({receiver}) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='profile__button' onClick={() => setShowModal(true)}>
                <i class="fas fa-comment"></i>
                Message the teacher!
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