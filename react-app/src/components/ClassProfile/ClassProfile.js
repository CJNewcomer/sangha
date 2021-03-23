import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { getOneClass, deleteClass } from '../../store/class';
import { addToUserClass } from '../../store/user_classes';
import CreateClassModal from '../CreateClassForm/CreateClassModal';
import ClassReview from '../ClassReviews/ClassReview';

import './ClassProfile.css';

export const convertTime = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour12: true,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

const ClassProfile = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {classId, reviewId} = useParams();
    const [setErrors] = useState([]);

    const yogaClass = useSelector((state) => state.class[classId]);
    const sessionUser = useSelector((state) => state.session.user);
    

    useEffect(() => {
        dispatch(getOneClass(classId))
    }, [dispatch, classId])

    
    
    const onDelete = (e) => {
        const res = window.confirm(`Are you sure you want to delete ${yogaClass.name}?`)
        if (res) {
            dispatch(deleteClass(yogaClass.id))
            history.push(`/classes/${yogaClass.id}`)
        }
    }

    const addOneClass = async () => {
        const data = await dispatch(addToUserClass(sessionUser.id, yogaClass.id))
        if (data.errors) {
            setErrors([data.errors])
        } else {
            history.push(`/users/${sessionUser.id}`)
        }
    }
        
    if (!yogaClass) return null;

    return (
        <>
            <div className='profile__container'>
                <div className='profile__image-button'>
                    <img src={yogaClass.class_image} alt="Class Profile"/>
                        <div className='profile__update-class'>
                            {sessionUser.id === yogaClass.teacher.id && 
                            <div>
                                <CreateClassModal updateOneClass={yogaClass} />
                            <button
                                className='profile__delete-class'
                                onClick={onDelete}>Delete Class</button>
                            </div>
                            }
                        </div>
                        <div className='profile__book-class'>
                            {sessionUser.id !== yogaClass?.teacher.id &&
                            <button className='class__add' onClick={addOneClass}>Book This Class</button>}
                        </div>
                    <div className='profile__info'>
                        <h2>{yogaClass.name}</h2>
                        <h3>{yogaClass.type}</h3>
                        <h3>{(new Date(yogaClass.time)).toLocaleString("en-US", convertTime)}</h3>
                        <h3>{yogaClass.location}</h3>
                        <h3>{yogaClass.locations.city}, {yogaClass.locations.state} {yogaClass.locations.country}</h3>
                        <h3>
                            <NavLink to={`/users/${yogaClass.teacher.id}`}>Teacher: {yogaClass.teacher.first_name}</NavLink>
                        </h3>
                        <h3>${yogaClass.price}</h3>
                        <h4 className='profile__description'>{yogaClass.description}</h4>
                    </div>
                </div>
            </div>
            <div className='profile__review-class'>
                {sessionUser.id === yogaClass.student.id && 
                <div>
                    <ClassReview />
                </div>
                }
            </div>
                
        </>
    )

}

export default ClassProfile;
