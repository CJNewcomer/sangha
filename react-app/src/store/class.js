const GET_CLASS = '/classes/get';
const CREATE_CLASS = 'classes/create';
const REMOVE_CLASS = 'classes/removeClass';

const get = (classes) => ({
    type: GET_CLASS,
    classes,
});

const create = (oneClass) => ({
    type: CREATE_CLASS,
    oneClass,
});

const remove = (oneClassId) => ({
    type: REMOVE_CLASS,
    oneClassId,
});


export const getClass = () => async (dispatch) => {
    const res = await fetch('/api/classes');
    const json = await res.json();
    if (res.ok) {
        dispatch(get(json.classes));
    }
};

export const createAClass = (oneClass, updateOneClass = null) => async (dispatch) => {
    const {
        location_id,
        user_id,
        name,
        type,
        class_image,
        image,
        date,
        time,
        location,
        description,
        price
    } = oneClass;

    const formData = new FormData();
    formData.append('location_id', location_id);
    formData.append('user_id', user_id);
    formData.append('name', name);
    formData.append('type', type);
    formData.append('class_image', class_image);
    formData.append('date', date);
    formData.append('time', time);
    formData.append('location', location);
    formData.append('description', description);
    formData.append('price', price);

    if (image) formData.append('image', image);

    if (updateOneClass) {
        // update a single class
        const res = await fetch(`/api/classes/${updateOneClass}`, {
            method: 'PUT',
            body: formData,
        });

        const updatedClass = await res.json();

        if (res.ok) {
            dispatch(create(updatedClass));
            return updatedClass;
        } else {
            const errors = oneClass;
            return errors;
        }
    } else {
        // creating a class
        const res = await fetch(`/api/classes`, {
            method: 'POST',
            body: formData,
        });
        const oneClass = await res.json();

        if (!oneClass.errors) {
            dispatch(create(oneClass));
            return oneClass;
        } else {
            const errors = oneClass;
            return errors;
        }
    } 
};

export const deleteClass = (oneClassId) => async (dispatch) => {
    const res = await fetch(`/api/classes/${oneClassId}`, {
        method: 'DELETE',
    });
    if (res.ok) {
        dispatch(remove(oneClassId));
    }
};

const initialState = {};

const classReducer = (state = initialState, action) => {
    const newState = {...state};
    switch (action.type) {
        case GET_CLASS:
            for (let oneClass of action.classes) {
                newState[oneClass.id] = oneClass;
            }
            return newState;
        case CREATE_CLASS:
            newState[action.oneClass.id] = action.oneClass;
            return newState;
            case REMOVE_CLASS:
                delete newState[Number(action.oneClassId)];
                return newState;
            default:
                return newState;
    }
};

export default classReducer;


