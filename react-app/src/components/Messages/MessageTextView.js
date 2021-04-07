import React from 'react';
import { useDispatch } from 'react-redux';
import { useOtherUserContext } from './index';
import MessageForm from './MessageForm';
import { deleteMessages } from '../../store/messages';

import './Message.css';

const MessageTextView = ({ lgdInUser, allMsgsWOtherUser }) => {
    const { otherUser } = useOtherUserContext();
    const dispatch = useDispatch();

    const handleDeleteMessage = (msg) => {
        const res = window.confirm(`Are you sure you want to delete this message? "${msg.message}`);
        if (res) dispatch(deleteMessages(msg.id))
    };

const formatDate = (dateString) => {
    let amPm = 'am';
    const date = new Date(dateString);
    let hours = date.getHours();
    if (hours >= 12) amPm = 'pm';
    if (hours > 12) hours -= 12;
    date.setHours(hours);
    const day = date.toDateString();
    const time = date.toTimeString().slice(0, 5);
    return `${day}, ${time} ${amPm}`;
};

    allMsgsWOtherUser.sort((a,b) => b.id - a.id);

    if (!otherUser.id) {
    return (
      <div className='message__container message__text-view'>
        <div>
          <h1 className='message__title'>No Conversation Selected</h1>
          <p style={{ textAlign: 'center' }}>
            Click a username to message a fellow yogi, or search classes to find teachers to message.
          </p>
        </div>
      </div>
    );
  }

    return (
        <div className='message__container message__text-view'>
            <h1 className='message__title'>
                {otherUser.id ? otherUser.username : "No Conversation Selected."}
            </h1>
            <hr />
            <div className='message__text-form'>
                <div className='message__text'>
                    {otherUser && allMsgsWOtherUser.map((msg) => (
                        <div className={
                            lgdInUser.id === msg.sender_id
                            ? 'messages__right'
                            : 'messages__left'
                        }
                        key={msg.id}
                        >
                            <p
                                style={
                                    lgdInUser.id === msg.sender_id
                                    ? {
                                        background: 'rgba(13, 51, 223, 0.3)',
                                        borderRadius:'2rem',
                                    }
                                    : {}
                                }
                                className='single__message'
                                title={msg.sender.username}
                                onClick={lgdInUser.id === msg.sender_id ? () => handleDeleteMessage(msg) : undefined}
                                >
                                    {msg.message}
                                </p>
                                <p className='message__timestamp'>{formatDate(msg.timestamp)}</p>
                        </div>
                    ))}
                </div>
                <div>
                    <MessageForm />
                </div>
            </div>
        </div>
    );
}

export default MessageTextView;