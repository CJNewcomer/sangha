import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getOneReview, getReview, removeReview } from '../../store/review';
import { addReviewToClass } from '../../store/user_classes';
import CreateReviewModal from '../ClassReviews/index';
import './ClassReview.css';


const ClassReview = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {classId, userId} = useParams();
    const [errors, setErrors] = useState([]);

    const classReviews = useSelector((state) => state.classReviews.all);
    const sessionUser = useSelector((state) => state.session.user);
    
    useEffect(() => {
        dispatch(getReview(classId))
        console.log("-------------", classReviews)
    }, [dispatch, classId])

    return (
        <div className='reviews__main'>
            <h1 className='reviews__title'>Class Reviews</h1>
            <div className='reviews__listed'>
                {classReviews === null &&
                    <p>Start a trend, review your recent class!</p>
                    }
                {classReviews !== null &&
                <>
                    {Object.values(classReviews).map(classReview => 
                    <div key={classReview.id}>
                        <CreateReviewModal classReview={classReview} />
                    </div>
                    )}
                </>
                }
            </div>
        </div>
    )
}

export default ClassReview;