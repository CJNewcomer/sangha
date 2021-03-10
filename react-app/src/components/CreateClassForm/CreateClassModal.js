import React, { useState } from 'react';
import { Modal } from '../../context/ModalAuthContext';
import CreateClassForm from '../CreateClassForm';

export default function CreateClassModal({ updateOneClass }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className={
          updateOneClass
            ? 'profile-button'
            : 'nav__item navbar-dropdown__nav__item'
        }
        onClick={() => setShowModal(true)}
      >
        {!!updateOneClass ? 'Update Class' : 'Add Class'}
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateClassForm
            updateOneClass={updateOneClass}
            setShowModal={setShowModal}
          />
        </Modal>
      )}
    </>
  );
}