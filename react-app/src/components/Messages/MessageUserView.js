import React from 'react';
import {useOtherUserContext} from '../../context/OtherUser';

import './Message.css';


const MessageUserView = ({allUsers, sessionUser, allMessagesForUser}) => {
    const {otherUser, setOtherUser} = useOtherUserContext();

    // find users (once) that sessionUser has had convo with
    const set = new Set();
    const prevMessageArray = [];

    for (let i = allMessagesForUser.length - 1; i >= 0; i--) {
        let msg = allMessagesForUser[i];
        const addId = 
            msg.sender_id === sessionUser.id ? msg.receiver_id : msg.sender_id;
        if (!set.has(addId)) prevMessageArray.push(addId);
            set.add(addId);
    }

    const messageUsers = [];
    prevMessageArray.forEach((id) => messageUsers.push(allUsers[id]));
    if (messageUsers.length === 0) messageUsers.push({ username: "No Message History."});

    return (
        <>
            {messageUsers.length > 0 && !!messageUsers[0] && (
                <div className='message__container message__users-container'>
                    <h3 className='message__title'>Messages</h3>
                    <hr />
                    {messageUsers.map((user) => {
                        return (
                            <div
                                className={
                                    user.username === "No Message History."
                                    ? 'message__no-history'
                                    : user.id === otherUser.id
                                    ? 'message__other-user message__other-user-active'
                                    : 'message__other-user'
                                }
                                key={user.username}
                                onClick={() => {
                                    setOtherUser(user);
                                }}
                            >
                                <div style={{display:"flex", alignItems:"center"}}>
                                {user.username}
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