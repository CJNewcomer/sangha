import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MessageView from '../Messages/MessageView';
import {getAllUsers} from '../../store/user';
import {getMessages} from '../../store/messages';
import {useOtherUserContext} from '../../context/OtherUser';

import './Message.css';

const AllTheMessages = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const allMessages = useSelector((state) => state.message);
    const allUsers = useSelector((state) => state.users);
    const {otherUser} = useOtherUserContext();
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getAllUsers());
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
            <div>
                {allUsers && sessionUser && allMessagesForUser && allMessagesFOtherUser && (
                    <div>
                        <div>
                            <MessageView 
                            sessionUser={sessionUser}
                            allMessagesFOtherUser={allMessagesFOtherUser}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default AllTheMessages;