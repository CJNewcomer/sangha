import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css'


const ModalAuthContext = createContext();
export const useModalAuthContext = () => useContext(ModalAuthContext);

export const ModalProvider = ({ children }) => {
    const modalRef = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(modalRef.current);
    },[]);

    return (
        <>
            <ModalAuthContext.Provider value={{ modalNode: value }}>
                {children}
            </ModalAuthContext.Provider>
            <div ref={modalRef} />
        </>
    );
}

export const Modal = ({onClose, children}) => {
    const { modalNode } = useModalAuthContext();
    if (!modalNode) return null;

    return ReactDOM.createPortal(
        <div className='modal'>
            <div className='modal__background' onClick={onClose} />
            <div className='modal__content'>{children}</div>
        </div>,
        modalNode
    );
}