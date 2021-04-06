import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOtherUserContext } from '../../context/OtherUser';
import CreateMessage from './CreateMessage';
import { deleteMessages } from '../../store/messages';

import './Message.css';

const MessageView = ({ sessionUser }) => {
    const { otherUser } = useOtherUserContext();
    const dispatch = useDispatch();
    const allMessages = useSelector((state) => state.message);

    const messagesArray = Object.values(allMessages);
    const allMessagesForUser = messagesArray.filter((message) => {
        message.sender_id === sessionUser.id ||
        message.receiver_id === sessionUser.id
    });

    const allMessagesFOtherUser = allMessagesForUser.filter((message) => {
        const checkId = otherUser.id;
        return message.sender_id === checkId || message.receiver_id === checkId;
    });

    const handleDeleteMessage = (message_id) => {
        const res = window.confirm(`Are you sure you want to delete this message? "${message_id.message}`);
        if (res) dispatch(deleteMessages(message_id))
    };

    if (!otherUser.id) {
        return (
            <div>
                <div>
                    <h3>Please Select A Conversation</h3>
                        <hr />
                        <h4>Please Click a Sangha Member to Send A Message</h4>
                </div>
            </div>
        );
    }

    allMessagesFOtherUser.sort((a,b) => a.id - b.id);

    return (
        <div>
            <h1>
                {otherUser.id ? otherUser.first_name : "No Conversation Selected."}
            </h1>
            <hr />
            <div>
                <div>
                    {otherUser && allMessagesFOtherUser.map((message_id) => (
                        <div className={
                            sessionUser.id ===message_id.sender_id
                            ? 'messages__right'
                            : 'messages__left'
                        }
                        key={message_id.id}
                        >
                            <p
                                style={
                                    sessionUser.id === message_id.sender_id
                                    ? {
                                        background: 'rgba(13, 51, 223, 0.3)',
                                        borderRadius:'2rem',
                                    }
                                    : {}
                                }
                                className='single__message'
                                title={message_id.sender.first_name}
                                onClick={sessionUser.id === message_id.sender_id ? () => handleDeleteMessage(message_id) : undefined}
                                >
                                    {message_id.message}
                                </p>
                        </div>
                    ))}
                </div>
                <div>
                    <CreateMessage />
                </div>
            </div>
        </div>
    );
}

export default MessageView;