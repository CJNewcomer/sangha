import React, { useState } from 'react';
import { Modal } from '../../../context/ModalAuthContext';
import LoginForm from './LoginForm';
import './LoginForm.css';

const LoginFormModal = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='login__modal' onClick={() => setShowModal(true)}>Log In</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm />
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;