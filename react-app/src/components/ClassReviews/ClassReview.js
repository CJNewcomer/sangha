import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getReview, removeReview } from '../../store/review';
import CreateReviewModal from '../ClassReviews/index';
import './ClassReview.css';

export const convertTime = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour12: true,
  hour: "2-digit",
  minute: "2-digit",
};

const ClassReview = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {classId} = useParams();
    const [errors, setErrors] = useState([]);

    const classReviews = useSelector((state) => state.review);
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(getReview(classId))
    }, [dispatch, classId])

    return (
        <div className='reviews__main'>
            <div className='reviews__container'>
                <div>
                <h1 className='reviews__title'>Class Reviews</h1>
                    <div className='reviews__listed'>
                        {!Object.values(classReviews).length &&
                            <p>Start a trend, review your recent class!</p>
                            }
                        {Object.values(classReviews).length > 0 &&
                        <>
                            {Object.values(classReviews).map(classReview => {
                                return (
                                    <>
                                        <div className='review__block' key={classReview.id}>
                                            <div className='review__block-info'>
                                                <h3>{classReview.user_id}</h3>
                                                <p>{(new Date(classReview.created_at)).toLocaleString("en-US", convertTime)}</p>
                                                <p>{classReview.comment}</p>
                                            </div> 
                                        </div>
                                        {sessionUser.id !== classReview.user_id && 
                                        <div classname='review__create' >
                                            <CreateReviewModal classReview={classReview} class_id={classId} />
                                        </div>
                                        }
                                    </>
                                )
                            })}
                        </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClassReview;