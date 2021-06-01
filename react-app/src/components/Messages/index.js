import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from "socket.io-client";

import MessageTextView from './MessageTextView';
import MessageUserView from './MessageUserView';

import {getMessages} from '../../store/messages';
import {getAllUsers} from '../../store/user';
import './Message.css';

const OtherUserContext = createContext();
export const useOtherUserContext = () => useContext(OtherUserContext);

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


    // SocketIO
    const [messages, setMessages] = useState(["Hello! Welcome!"]);
    const [message, setMessage] = useState("");

    // will call when first time app render and every time message length changes
    const getMessages = () => {
        socket.on('message', msg => {
        setMessages([...messages, msg.msg.message]);
        });
    };

    // useEffect will auto call when message length changes
    useEffect(() => {
        getMessages();
    }, [messages.length]);

    // if change in input field, onChange will call
    const onChange = e => {
        setMessage(e.target.value);
    };

    // when send button pressed, onClick will call
    const onClick = () => {
        if (message !== "") {
        // when button clicked emit message to server
        socket.emit("message", JSON.stringify({message}));
        setMessage("");
        } else {
        alert("Please Add A Message");
        }
    };

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