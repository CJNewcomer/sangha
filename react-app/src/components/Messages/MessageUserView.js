import React from 'react';
import {useOtherUserContext} from './index';

import './Message.css';


const MessageUserView = ({allUsers, lgdInUser, allMsgsLgdInUser}) => {
    const {otherUser, setOtherUser} = useOtherUserContext();

    // find users (once) that lgdInUser has had convo with
    const set = new Set();
    const prevMessageArray = [];

    for (let i = allMsgsLgdInUser.length - 1; i >= 0; i--) {
        let msg = allMsgsLgdInUser[i];
        const addId = 
            msg.sender_id === lgdInUser.id ? msg.receiver_id : msg.sender_id;
        if (!set.has(addId)) prevMessageArray.push(addId);
            set.add(addId);
    }

    const messageUsers = [];
    prevMessageArray.forEach((id) => messageUsers.push(allUsers[id]));
    if (messageUsers.length === 0) messageUsers.push({ first_name: "No Message History."});

    return (
        <>
            {messageUsers.length > 0 && !!messageUsers[0] && (
                <div className='message__container message__users-container'>
                    <h3 className='message__title'>Conversations</h3>
                    {messageUsers.map((user) => {
                        return (
                            <div
                                className={
                                    user.first_name === "No Message History."
                                    ? 'message__no-history'
                                    : user.id === otherUser.id
                                    ? 'message__other-user message__other-user-active'
                                    : 'message__other-user'
                                }
                                key={user.first_name}
                                onClick={() => {
                                    setOtherUser(user);
                                }}
                            >
                                <div style={{display:"flex", alignItems:"center"}}>
                                {user.first_name} {user.last_name}
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