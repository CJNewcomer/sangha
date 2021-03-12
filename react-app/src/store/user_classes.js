const ADD = 'user_classes/ADD';

const addClass = (oneClass) => ({
    type: ADD,
    oneClass,
})
// look up class_id against current user 
export const addToUserClass = (oneClass) => async (dispatch) => {
    
    return {
     
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