const LOAD_MESSAGES = "/messages/loadMessages";
const CREATE_MESSAGE = "/messages/createMessages";
const REMOVE_MESSAGE = "/messages/removeMessages";

const loadMessages = (messages) => ({
    type: LOAD_MESSAGES,
    messages,
});

const createMessages = (message) => ({
    type: CREATE_MESSAGE,
    message,
});

const removeMessages = (message_id) => ({
    type: REMOVE_MESSAGE,
    message_id,
});


export const getMessages = () => async (dispatch) => {
    const res = await fetch("/api/messages");
    const json = await res.json();
    if (res.ok) {
        dispatch(loadMessages(json.messages));
    }
};

export const createMessages = (newMessage) => async (dispatch) => {
    const {
        sender_id,
        receiver_id,
        message,
    } = new_message;

    const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            sender_id,
            receiver_id,
            message,
        }),
    });
    const returnedMessages = await res.json();

    if (!returnedMessages.errors) {
        dispatch(createMessages(returnedMessages));
        return returnedMessages;
    } else {
        const errors = returnedMessages;
        return errors;
    }
};

export const deleteMessages = (message_id) => async (dispatch) => {
    const res = await fetch(`/api/messages/${message_id}`, {
        method: "DELETE",
    });
    if (res.ok) {
        dispatch(removeMessages(message_id));
    }
};


const initialState = {};

const messageReducer = (state = initialState, action) => {
    const newState = {...state};
    switch (action.type) {
        case LOAD_MESSAGES:
            return {...action.messages}
        case CREATE_MESSAGE:
            newState[action.message.id] = action.message;
            return newState;
        case REMOVE_MESSAGE:
            delete newState[Number(action.message_id)];
            return newState;
        default:
            return newState;
    }
};


export default messageReducer;