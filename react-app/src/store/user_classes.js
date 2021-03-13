const ADD = 'user_classes/ADD';

const addClass = (oneClass) => ({
    type: ADD,
    oneClass,
})
// look up class_id against current user 
export const addToUserClass = (oneClass) => async (dispatch) => {
    const { class_id, user_id } = oneClass;

    const res = await fetch(`/api/${user_id}/myclasses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            class_id,
            user_id
        }),
    });

    const bookedClass = await res.json();

    if (!bookedClass.errors) {
        dispatch(addClass(bookedClass))
        return bookedClass;
    } else {
        const errors = bookedClass;
        return errors;
    }
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