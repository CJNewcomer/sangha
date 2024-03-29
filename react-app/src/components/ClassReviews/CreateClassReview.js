import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { createReview } from '../../store/review';
import "./CreateClassReviews.css";


const CreateReview = ({ updateOneReview, class_id, setShowModal }) => {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (updateOneReview) {
            setComment(updateOneReview.comment);
        }
    }, [updateOneReview]);

    const createClassReview = async (e) => {
        e.preventDefault();
        setErrors([]);
        let newErrors = [];

        const review = {
            user_id: sessionUser.id,
            class_id,
            comment,
        };

        const reviewErrors = await dispatch(
            updateOneReview ? createReview(review, updateOneReview.id)
            : createReview(review)
        );
        if (reviewErrors.errors) {
            newErrors = reviewErrors.errors;
            setErrors(newErrors);
        } else {
            setShowModal(false);
        }
    };

    return (
        <div className='review__container'>
            <h1>{updateOneReview ? 'Edit Review' : 'Create Review'}</h1>
            <form onSubmit={createClassReview} className='review__form'>
                <div className='row'>
                    <div className='col-25'>
                        <label>Comment</label>
                    </div>
                    <div className='col-75'>
                        <textarea
                            className='review__text'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                            />
                    </div>
                </div>
                <div className='row'>
                    <button type='submit'>{updateOneReview ? 'Edit Review' : 'Create Review'}</button>
                </div>
                <div className='row'>
                    {errors.map((error) => (
                        <div key={error}>{error}</div>
                    ))}
                </div>
            </form>
        </div>
    )

}

export default CreateReview;