const ADD_CLASS = 'user_classes/addClass';
const LOAD_CLASS = 'user_classes/loadClass';
const CANCEL_CLASS = 'user_classes/cancelClass';
const ADD_REVIEW = 'user_classes/addReview';

const addClass = () => ({
    type: ADD_CLASS,
})

const loadClass = (classes) => ({
    type: LOAD_CLASS,
    classes,
})

const cancelClass = (class_id, user_id) => ({
    type: CANCEL_CLASS,
    class_id,
    user_id,
})

const addReview = () => ({
    type: ADD_REVIEW,
})

export const addToUserClass = (user_id, class_id) => async (dispatch) => {
    const res = await fetch(`/api/users/${user_id}/classes/${class_id}`, {
        method: 'POST',
    })
    const data = await res.json()
    dispatch(addClass())
    return data;
}

export const getUserClasses = (user_id, class_id) => async (dispatch) => {
    const res = await fetch(`/api/users/${user_id}/classes/${class_id}`);
    const json = await res.json();
    if (res.ok) {
        dispatch(loadClass(json.classes));
    }
}

export const cancelUserClass = (user_id, class_id) => async (dispatch) => {
    const res = await fetch(`/api/users/${user_id}/classes/${class_id}`, {
        method: 'PUT',
    });
    const cancel = await res.json();
    dispatch(cancelClass(class_id))
}

export const addReviewToClass = (user_id, review_id) => async (dispatch) => {
    const res = await fetch(`/api/users/${user_id}/reviews/${review_id}`, {
        method: 'POST',
    })
    const data = await res.json()
    dispatch(addReview(user_id, review_id))
    return data;
}


const userClassReducer = (state={}, action) => {
    switch(action.type){
        case ADD_CLASS:
            const newState = {...state};
            if (!newState[action.id]){
                newState[action.id] = {id: action.id, count:1}
            } 
            return newState;
        case LOAD_CLASS:
            for (let oneClass of action.classes) {
                newState[oneClass.id] = oneClass;
            }
            return newState;
        case CANCEL_CLASS:
            if (newState[action.id]){
            delete newState[Number(action.class_id)];
            }
            return newState;
        case ADD_REVIEW:
            if (!newState[action.id]){
                newState[action.id] = {id: action.id}
            }
            return newState;
        default:
            return state;
    }
}

export default userClassReducer;