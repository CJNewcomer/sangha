const ADD = 'user_classes/ADD';

export const addToUserClass = (id) => {
    return {
        type: ADD,
        id
    }
}

const userClassReducer = (state={}, action) => {
    switch(action.type){
        case ADD:
            const newState = {...state};
            if (!newState[action.id]){
                newState[action.id] = {id: action.id, count:1}
            } else {

            }
            return newState;
        default:
            return state;
    }
}

export default userClassReducer;