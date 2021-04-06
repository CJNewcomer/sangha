const LOAD_MESSAGES = "/messages/load";
const CREATE_MESSAGE = "/messages/create";
const REMOVE_MESSAGE = "/messages/remove";

const load = (messages) => ({
    type: LOAD_MESSAGES,
    messages,
});

const create = (message) => ({
    type: CREATE_MESSAGE,
    message,
});

const remove = (message_id) => ({
    type: REMOVE_MESSAGE,
    message_id,
});

// currently NavBar is linking to /mymessages, same for all user_classes routes

export const getMessages = () => async (dispatch) => {
    const res = await fetch("/api/messages");
    const json = await res.json();
    if (res.ok) {
        dispatch(load(json.messages));
    }
};

export const createMessages = (newMessage) => async (dispatch) => {
    const {
        sender_id,
        receiver_id,
        message,
    } = newMessage;

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
        dispatch(create(returnedMessages));
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
        dispatch(remove(message_id));
    }
};


const initialState = {
  1: {
    sender_id: 1,
    receiver_id: 2,
    message: '',
    timestamp: '',
    sender: {
      username: '',
    },
    receiver: {
      username: '',
    },
  },
};

const messageReducer = (state = initialState, action) => {
    const newState = {...state};
    
    switch (action.type) {
        case LOAD_MESSAGES:
            for (let message of action.messages) {
                newState[message.id] = message;
            }
            return newState;
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