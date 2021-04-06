import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMessages } from '../../store/messages';
import { useOtherUserContext } from './index';
import './Message.css';


const MessageForm = () => {
    const dispatch = useDispatch();
    const [msg, setMsg] = useState("");

    const { otherUser } = useOtherUserContext();
    const lgdInUserId = useSelector((state) => state.session.user.id);

    const onSend = async (e) => {
        e.preventDefault();
        const messageOrErrors = await dispatch(
            createMessages({
                sender_id: lgdInUserId,
                receiver_id: otherUser.id,
                message: msg,
            })
        );
        if (!messageOrErrors.errors) {
            setMsg("");
        }
    };

    return (
        <form onSubmit={onSend} className='message__form'>
            <div>
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
                <button type='submit' className='message__form-button'>Send</button>
            </div>
        </form>
    );
}

export default MessageForm;