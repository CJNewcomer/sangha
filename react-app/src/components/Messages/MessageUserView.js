import React from 'react';
import {useSelector} from 'react-redux';
import {useOtherUserContext} from '../../context/OtherUser';

import './Message.css';


const MessageUserView = ({allUsers, sessionUser}) => {
    const allMessages = useSelector((state) => state.message);

    const {otherUser, setOtherUser} = useOtherUserContext();

    const messagesArray = Object.values(allMessages);
    const allMessagesForUser = messagesArray.filter((message) => 
        message.sender_id === sessionUser.id || message.receiver_id === sessionUser.id
    );

    // see user history 1 at a time
    const set = new Set();
    const prevMessageArray = [];

    for (let i = allMessagesForUser.length - 1; i >= 0; i--) {
        let mess = allMessagesForUser[i];
        const addId = mess.sender_id === sessionUser.id ? mess.receiver_id : mess.sender_id;
        if (!set.has(addId)) {
            prevMessageArray.push(addId);
            set.add(addId);
        }
    }
    const messageUsers = [];
    prevMessageArray.forEach((id) => messageUsers.push(allUsers[id]));
    if (messageUsers.length === 0) {
        messageUsers.push({ first_name: "No Message History."});
    }

    return (
        <>
            {messageUsers.length > 0 && !!messageUsers[0] && (
                <div className='message__container message__users-container'>
                    <h3 className='message__title'>Conversations</h3>
                    <hr />
                    {messageUsers.map((user) => {
                        return (
                            <div
                                className={
                                    user.first_name === "No Chat History."
                                    ? 'message__no-history'
                                    : user.id === otherUser.id
                                    ? 'message__other-user message__other-user-active'
                                    : 'message__other-user'
                                }
                                key={user.id}
                                onClick={() => {
                                    setOtherUser(user);
                                }}
                            >
                                <div style={{display:"flex", alignItems:"center"}}>
                                {user.first_name}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
}

export default MessageUserView;