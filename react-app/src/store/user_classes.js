import { create } from './class';

const LOAD_CLASS = 'user_classes/loadClass';
const CANCEL_CLASS = 'user_classes/cancelClass';
const ADD_REVIEW = 'user_classes/addReview';

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
    if (!data.errors) {
        dispatch(create(data))
    }
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
    const data = await res.json();
    if (!data.errors) {
        dispatch(create(data))
    }
    return data;
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
    const newState = {...state};
    switch(action.type){
        case ADD_CLASS:
            newState[action.class_id] = {id: action.class_id}
            return newState;
        case LOAD_CLASS:
            for (let oneClass of action.classes) {
                newState[oneClass.id] = oneClass;
            }
            return newState;
        case CANCEL_CLASS:
            if (newState[action.class_id]){
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