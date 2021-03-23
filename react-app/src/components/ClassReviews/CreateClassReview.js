import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createReview } from '../../store/review';
import "./CreateClassReviews.css";


const CreateReview = ({ updateOneReview }) => {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const [classId, setClassId] = useState('')
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
            class_id: sessionUser.classId,
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
            history.push(`/reviews/${reviewErrors.id}`);
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
                    <button type='submit'>Create Review</button>
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