import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMessages } from '../../store/messages';
import { useOtherUserContext } from './index';
import { io } from "socket.io-client";
import './Message.css';

// SocketIO Setup
let socket;
const createSocket = () => {
    if (process.env.NODE_ENV === "production") {
        socket = io("https://sangha-full-stack.herokuapp.com");
    } else {    
        socket = io();
    }
    return socket;
}

const MessageForm = () => {
    const dispatch = useDispatch();
    const [msg, setMsg] = useState("");

    const { otherUser } = useOtherUserContext();
    const lgdInUserId = useSelector((state) => state.session.user.id);

    useEffect(() => {
        createSocket()
    }, []);

    const onSend = async (e) => {
        e.preventDefault();
        socket.emit('message', JSON.stringify({ content: msg, sender_id: lgdInUserId, receiver_id: otherUser.id }))
        setMsg('');
    };
    
    useEffect(() => {
        socket.on('message', msg => {
            const payload = {
                sender_id: lgdInUserId,
                receiver_id: otherUser.id,
                message: msg,
                // timestamp: Date.now()
            }
            dispatch(createMessages(payload));
        })
    }, [dispatch, lgdInUserId, otherUser.id]);

    return (
        <form onSubmit={onSend} className='message__form'>
            <div className='form__input'>
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