const ADD = 'user_classes/ADD';

const addClass = () => ({
    type: ADD,
})

// look up class_id against current user 
export const addToUserClass = (class_id, user_id) => async (dispatch) => {
    const res = await fetch(`/api/users/${user_id}/myclasses/${class_id}`, {
        method: 'POST',
    })
    const data = await res.json()
    dispatch(addClass())
    return data;
}

const userClassReducer = (state={}, action) => {
    switch(action.type){
        // case ADD:
        //     const newState = {...state};
        //     if (!newState[action.id]){
        //         newState[action.id] = {id: action.id, count:1}
        //     } 
        //     return newState;
        default:
            return state;
    }
}

export default userClassReducer;