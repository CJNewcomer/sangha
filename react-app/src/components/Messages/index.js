import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MessageTextView from './MessageTextView';
import MessageUserView from './MessageUserView';

import {getMessages} from '../../store/messages';

import './Message.css';

const OtherUserContext = createContext();
export const useOtherUserContext = () => useContext(OtherUserContext);

const Messages = () => {
    const lgdInUser = useSelector((state) => state.session.user);
    const allMessages = useSelector((state) => state.message);
    const allUsers = useSelector((state) => state.users);

    const dispatch = useDispatch();

    const [otherUser, setOtherUser] = useState({id: null});


    useEffect(() => {
        dispatch(getMessages());
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
        <div>
            <div style={{padding:"1rem"}}>
                {allUsers && lgdInUser && allMsgsLgdInUser && allMsgsWOtherUser && (
                    <OtherUserContext.Provider value={{ otherUser, setOtherUser }}>
                        <div>
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
                        </div>
                    </OtherUserContext.Provider>
                )}
            </div>
        </div>
    );
}
export default Messages;