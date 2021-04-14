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
    // eslint-disable-next-line
    const history = useHistory();
    const {classId} = useParams();
    // eslint-disable-next-line
    const [errors, setErrors] = useState([]);

    const classReviews = useSelector((state) => state.review);
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(getReview(classId))
    }, [dispatch, classId])

    const deleteReview = (e) => {
        dispatch(removeReview(e.target.value))
    }

    return (
        <div className='reviews__main'>
            <div className='reviews__container'>
                <div>
                <h1 className='reviews__title'>
                    <span>Class Reviews</span>
                    {!Object.values(classReviews).some(classReview => classReview.user_id === sessionUser.id) &&
                        <div className='review__create' >
                            <CreateReviewModal class_id={classId} />
                        </div>
                        }
                    </h1>
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
                                                <h3>{classReview.username}</h3>
                                                <p>{(new Date(classReview.created_at)).toLocaleString("en-US", convertTime)}</p>
                                                <p>{classReview.comment}</p>
                                            </div> 
                                            <div>
                                                {sessionUser.id === classReview.user_id && (
                                                <>
                                                    <CreateReviewModal updateOneReview={classReview} class_id={classId}/>
                                                    <button value={classReview.id} onClick={deleteReview}>Delete Review</button>
                                                </>
                                                )}
                                            </div>
                                        </div>
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