import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMessages } from '../../store/messages';
import { useOtherUserContext } from '../../context/OtherUser';
import './Message.css';


const CreateMessage = () => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");

    const { otherUser } = useOtherUserContext();
    const sessionUserId = useSelector((state) => state.session.user.id);

    const onSend = async (e) => {
        e.preventDefault();
        const messageOrErrors = await dispatch(
            createMessages({
                sender_id: sessionUserId,
                receiver_id: otherUser.id,
                message: message,
            })
        );
        if (!messageOrErrors.errors) {
            setMessage("");
        }
    };

    return (
        <form onSubmit={onSend} className='message__form'>
            <div>
                <textarea 
                value={message}
                onChange={(e) => {
                    setMessage(e.target.value);
                }}
                className='message__form-input'
                maxLength={500}
                rows={3}
                required
                />

                <button type='submit' className='message__form-button'>Send</button>
            </div>
        </form>
    );
}

export default CreateMessage;