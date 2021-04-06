import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MessageTextView from './MessageTextView';
import MessageUserView from './MessageUserView';
import {getMessages} from '../../store/messages';
import {useOtherUserContext} from '../../context/OtherUser';

import './Message.css';

const AllTheMessages = () => {
    const lgdInUser = useSelector((state) => state.session.user);
    const allMessages = useSelector((state) => state.message);
    const allUsers = useSelector((state) => state.users);

    const otherUser = useOtherUserContext();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMessages());
    }, [dispatch]);


    const messagesArray = Object.values(allMessages);
    const allMessagesForUser = messagesArray.filter((message) => 
        message.sender_id === lgdInUser.id || 
        message.receiver_id === lgdInUser.id
    );

    const allMessagesFOtherUser = allMessagesForUser.filter((message) => {
        const checkId = otherUser.id;
        return message.sender_id === checkId || message.receiver_id === checkId;
    });


    return (
        <div>
            <div style={{padding:"1rem"}}>
                {allUsers && lgdInUser && allMessagesForUser && allMessagesFOtherUser && (
                    <div>
                        <div className='messages'>
                            <MessageUserView 
                            allUsers={allUsers}
                            lgdInUser={lgdInUser}
                            allMessagesForUser={allMessagesForUser}
                            />
                            <MessageTextView 
                            lgdInUser={lgdInUser}
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