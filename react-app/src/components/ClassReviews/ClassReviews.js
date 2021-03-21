import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { createReview } from '../../store/review';
import "./ClassReviews.css";


const CreateReview = ({ updateOneReview }) => {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

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
            history.push(`/reviews/${reviewErrors.id}`);
        }
    };

    return (
        
    )

}