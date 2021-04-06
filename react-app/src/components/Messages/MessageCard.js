import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MessageUserView from './MessageUserView';
import {getMessages} from '../../store/messages';
import {useOtherUserContext} from '../../context/OtherUser';
import './Message.css';


const Message = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const allMessages = useSelector((state) => state.message);
    const allUsers = useSelector((state) => state.users);
    const {otherUser} = useOtherUserContext();

    const messagesArray = Object.values(allMessages);
    const allMessagesForUser = messagesArray.filter((message) => 
        message.sender_id === sessionUser.id ||
        message.receiver_id === sessionUser.id
    );

    const allMessagesFOtherUser = allMessagesForUser.filter((message) => {
        const checkId = otherUser.id;
        return message.sender_id === checkId || message.receiver_id === checkId
    });

    return (
        <div>
            {allUsers && sessionUser && allMessagesForUser && allMessagesFOtherUser && (
                <div className='message'>
                    <MessageUserView 
                    allUsers={allUsers}
                    sessionUser={sessionUser}
                    allMessagesForUser={allMessagesForUser}
                    />
                </div>
            )}
        </div>
    );
}

export default Message;