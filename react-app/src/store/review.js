const GET_REVIEW = 'reviews/get';
const CREATE_REVIEW = 'reviews/create';
const REMOVE_REVIEW = 'reviews/removeReview';


const get = (reviews) => ({
    type: GET_REVIEW,
    reviews,
});

const create = (review) => ({
    type: CREATE_REVIEW,
    review,
});

const remove = (review_id) => ({
    type: REMOVE_REVIEW,
    review_id,
});


export const getReview = () => async (dispatch) => {
    const res = await fetch('api/reviews');
    const json = await res.json();
    if (res.ok) {
        dispatch(get(json.reviews));
    }
};

export const getOneReview = (review_id) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${review_id}`);
    const json = await res.json();
    return dispatch(get(json.reviews));
}

export const createReview = (review, updateOneReview = null) => async (dispatch) => {
    const {
        user_id,
        class_id,
        comment,
        created_at,
        updated_at
    } = review;

    const formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('class_id', class_id);
    formData.append('comment', comment);
    formData.append('created_at', created_at);
    formData.append('updated_at', updated_at);

    if (updateOneReview) {
        const res = await fetch(`/api/reviews/${updateOneReview}`, {
            method: 'PUT',
            body: formData,
        });

        const updatedReview = await res.json();

        if (res.ok) {
            dispatch(create(updatedReview));
            return updatedReview;
        } else {
            const errors = review;
            return errors;
        }
    } else {
        const res = await fetch('/api/reviews', {
            method: 'POST',
            body: formData,
        });
        const review = await res.json();

        if (!review.errors) {
            dispatch(create(review));
            return review;
        } else {
            const errors = review;
            return errors;
        }
    }
};

export const removeReview = (review_id) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${review_id}`, {
        method: 'DELETE',
    });
    if (res.ok) {
        dispatch(remove(review_id));
    }
};


const initialState = {};

const reviewReducer = (state = initialState, action) => {
    const newState = {...state};
    switch (action.type) {
        case GET_REVIEW:
            for (let review of action.reviews) {
                newState[review.id] = review;
            }
            return newState;
        case CREATE_REVIEW:
            newState[action.review.id] = action.review;
            return newState;
        case REMOVE_REVIEW:
            delete newState[Number(action.review)];
            return newState;
            default:
                return newState;
    }
};

export default reviewReducer;