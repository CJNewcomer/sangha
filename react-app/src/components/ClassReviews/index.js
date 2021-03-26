import React, { useState } from 'react';
import { Modal } from '../../context/ModalAuthContext';
import CreateReview from './CreateClassReview';

export default function CreateReviewModal( {updateOneReview, class_id} ) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button
                className="create__edit-review"
                onClick={() => setShowModal(true)}
                >
                    {updateOneReview ? 'Edit Review' : 'Create Review'}
                </button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <CreateReview
                        updateOneReview={updateOneReview}
                        class_id={class_id}
                        setShowModal={setShowModal}
                        />
                    </Modal>
                )}
        </>
    );
}