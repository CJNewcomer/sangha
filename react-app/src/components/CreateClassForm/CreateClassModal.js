import { useState } from 'react';
import { Modal } from '../../context/ModalAuthContext';
import CreateClassForm from '../CreateClassForm';

export default function CreateClassModal({ updateOneClass }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="add__update-class"
        onClick={() => setShowModal(true)}
      >
        {!updateOneClass ? 'Add Class' : 'Update Class'}
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