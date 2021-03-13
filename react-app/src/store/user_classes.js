const ADD = 'user_classes/ADD';

const addClass = (oneClass) => ({
    type: ADD,
    oneClass,
})
// look up class_id against current user 
export const addToUserClass = (oneClass) => async (dispatch) => {
    const res = await fetch(`/api/${user.id}/myclasses`, {
        method: 'POST',
        body: 
    })
  
}

const userClassReducer = (state={}, action) => {
    switch(action.type){
        case ADD:
            const newState = {...state};
            if (!newState[action.id]){
                newState[action.id] = {id: action.id, count:1}
            } 
            return newState;
        default:
            return state;
    }
}

export default userClassReducer;