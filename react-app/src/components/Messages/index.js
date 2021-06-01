import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { io } from "socket.io-client";

import MessageTextView from './MessageTextView';
import MessageUserView from './MessageUserView';

import {getMessages} from '../../store/messages';
// import {createMessages} from '../../store/messages';
import {getAllUsers} from '../../store/user';
import './Message.css';

const OtherUserContext = createContext();
export const useOtherUserContext = () => useContext(OtherUserContext);

// SocketIO Setup
// let socket;
// const createSocket = () => {
//     if (process.env.NODE_ENV === "production") {
//         socket = io("https://sangha-full-stack.herokuapp.com");
//     } else {    
//         socket = io();
//     }
//     return socket;
// }

const Messages = () => {
    // const [currMessage, setCurrMessage] = useState('');
    const [otherUser, setOtherUser] = useState({ id: null });

    const lgdInUser = useSelector((state) => state.session.user);
    const allMessages = useSelector((state) => state.message);
    const allUsers = useSelector((state) => state.user);

    const dispatch = useDispatch();

    // useEffect(() => {
    //     createSocket()
    // }, []);

    
    const messagesArray = Object.values(allMessages);
    const allMsgsLgdInUser = messagesArray.filter((message) => 
    message.sender_id === lgdInUser.id || message.receiver_id === lgdInUser.id
    );
    
    const allMsgsWOtherUser = allMsgsLgdInUser.filter((message) => {
        const checkId = otherUser.id;
        return message.sender_id === checkId || message.receiver_id === checkId;
    });
    
    // const onSend = () => {
    //     socket.emit('message', JSON.stringify({ content: currMessage }))
    //     setCurrMessage('');
    // };
    
    // useEffect(() => {
    //     socket.on('message', msg => {
    //         const payload = {
    //             sender_id: msg.sender_id,
    //             receiver_id: msg.receiver_id,
    //             message: msg.msg,
    //             timestamp: Date.now()
    //         }
    //         dispatch(createMessages(payload));
    //     })
    // }, [dispatch]);
    
    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getMessages());
    }, [dispatch]);
    
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