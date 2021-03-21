const ADD_CLASS = 'user_classes/ADD_CLASS';
const ADD_REVIEW = 'user_classes/ADD_REVIEW';

const addClass = () => ({
    type: ADD_CLASS,
})

const addReview = () => ({
    type: ADD_REVIEW,
})

// look up class_id against current user 

export const addToUserClass = (user_id, class_id) => async (dispatch) => {
    const res = await fetch(`/api/users/${user_id}/myclasses/${class_id}`, {
        method: 'POST',
    })
    const data = await res.json()
    dispatch(addClass())
    return data;
}

export const addReviewToClass = (user_id, class_id, review_id) => async (dispatch) => {
    const res = await fetch(`/api/`)
}


const userClassReducer = (state={}, action) => {
    switch(action.type){
        case ADD_CLASS:
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