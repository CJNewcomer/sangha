import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MessageTextView from '../Messages/MessageTextView';
import MessageUserView from '../Messages/MessageUserView';
import {getMessages} from '../../store/messages';
import {useOtherUserContext} from '../../context/OtherUser';

import './Message.css';

const AllTheMessages = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const allMessages = useSelector((state) => state.messages);
    const allUsers = useSelector((state) => state.users);

    const {otherUser} = useOtherUserContext();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMessages());
    }, [dispatch]);


    const messagesArray = Object.values(allMessages);
    const allMessagesForUser = messagesArray.filter((message) => 
    message.sender_id === sessionUser.id || 
    message.receiver_id === sessionUser.id
    );

    const allMessagesFOtherUser = allMessagesForUser.filter((message) => {
        const checkId = otherUser.id;
        return message.sender_id === checkId || message.receiver_id === checkId;
    });


    return (
        <div>
            <div style={{padding:"1rem"}}>
                {allUsers && sessionUser && allMessagesForUser && allMessagesFOtherUser && (
                    <div>
                        <div className='messages'>
                            <MessageUserView 
                            allUsers={allUsers}
                            sessionUser={sessionUser}
                            allMessagesForUser={allMessagesForUser}
                            />
                            <MessageTextView 
                            sessionUser={sessionUser}
                            allMessagesFOtherUser={allMessagesFOtherUser}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default AllTheMessages;