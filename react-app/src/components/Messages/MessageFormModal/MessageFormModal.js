import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMessages } from '../../../store/messages';


const MessageFormForModal = ({ receiver, setShowModal }) => {
  const dispatch = useDispatch();
  const [msg, setMsg] = useState('');

  const lgdInUserId = useSelector((state) => state.session.user.id);

  const onSend = async function (e) {
    e.preventDefault();
    const msgOrErrors = await dispatch(
      createMessages({
        sender_id: lgdInUserId,
        receiver_id: receiver.id,
        message: msg,
      })
    );
    if (!msgOrErrors.errors) {
      setMsg('');
      setShowModal(false);
    }
  };

  return (
    <form onSubmit={onSend} className='message__form-modal'>
      {/* <h2>Message {receiver.username}</h2> */}
      <div className='message__form-modal__msg-and-btn'>
        <textarea
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
          className='message__form-input'
          maxLength={500}
          rows={3}
          required
        />
        <button type='submit' className='message__form-modal__button'>Send</button>
      </div>
    </form>
  );
}

export default MessageFormForModal;