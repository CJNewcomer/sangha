import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MessageTextView from './MessageTextView';
import MessageUserView from './MessageUserView';

import {getMessages} from '../../store/messages';
import {getAllUsers} from '../../store/user';

import './Message.css';

const OtherUserContext = createContext();
export const useOtherUserContext = () => useContext(OtherUserContext);

const Messages = () => {
    const lgdInUser = useSelector((state) => state.session.user);
    const allMessages = useSelector((state) => state.message);
    const allUsers = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const [otherUser, setOtherUser] = useState({ id: null });


    useEffect(() => {
        dispatch(getMessages());
        dispatch(getAllUsers());
    }, [dispatch]);


    const messagesArray = Object.values(allMessages);
    const allMsgsLgdInUser = messagesArray.filter((message) => 
        message.sender_id === lgdInUser.id || message.receiver_id === lgdInUser.id
    );

    const allMsgsWOtherUser = allMsgsLgdInUser.filter((message) => {
        const checkId = otherUser.id;
        return message.sender_id === checkId || message.receiver_id === checkId;
    });


    return (
        <>
            {allUsers && lgdInUser && allMsgsLgdInUser && allMsgsWOtherUser && (
                <OtherUserContext.Provider value={{ otherUser, setOtherUser }}>
                    <div className='messages'>
                        <MessageUserView 
                        allUsers={allUsers}
                        lgdInUser={lgdInUser}
                        allMsgsLgdInUser={allMsgsLgdInUser}
                        />
                        <MessageTextView 
                        lgdInUser={lgdInUser}
                        allMsgsWOtherUser={allMsgsWOtherUser}
                        />
                    </div>
                </OtherUserContext.Provider>
            )}
        </>
    );
}
export default Messages;