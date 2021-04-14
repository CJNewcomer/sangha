import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { getOneClass, deleteClass } from '../../store/class';
import { addToUserClass, cancelUserClass } from '../../store/user_classes';

import CreateClassModal from '../CreateClassForm/CreateClassModal';
import ClassReview from '../ClassReviews/ClassReview';
import MessageModal from '../Messages/MessageModal';

import './ClassProfile.css';

export const convertTime = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour12: true,
  hour: "2-digit",
  minute: "2-digit"
};

const ClassProfile = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {classId} = useParams();
    // eslint-disable-next-line
    const [_, setErrors] = useState([]);

    const yogaClass = useSelector((state) => state.class[classId]);
    const sessionUser = useSelector((state) => state.session.user);


    useEffect(() => {
        dispatch(getOneClass(classId))
    }, [dispatch, classId])

    
    
    const onDelete = () => {
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

    const cancelOneClass = async (e) => {
        e.preventDefault();
        await dispatch(cancelUserClass(sessionUser.id, yogaClass.id))
    }
        
    if (!yogaClass) return null;

    return (
        <>
            <div className='profile__container'>
                <div className='profile__image-button'>
                    <i className='fas fa-times' onClick={()=>{history.push('/search')}}></i>
                    <img src={yogaClass.class_image} alt="Class Profile"/>
                        <div className='profile__message-teacher'>
                            {sessionUser.id !== yogaClass.teacher.id && 
                            <div>
                                <MessageModal receiver={yogaClass.teacher}/>
                            </div>}
                        </div>
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
                            {(sessionUser.id !== yogaClass?.teacher.id) && (!yogaClass.student.some(student => student.id === sessionUser.id)) &&
                            <button className='class__add' onClick={addOneClass}>Book This Class</button>} 
                        </div> 
                        <div className='profile__cancel-class'>
                            {(sessionUser.id !== yogaClass?.teacher.id) && (yogaClass.student.some(student => student.id === sessionUser.id)) && 
                            <button className='class__cancel' onClick={cancelOneClass}>Cancel My Booking</button>}
                        </div>
                    <div className='profile__info'>
                        <h2>{yogaClass.name}</h2>
                        <h3>{yogaClass.type}</h3>
                        <h3>{(new Date(yogaClass.time)).toLocaleString("en-US", convertTime)}</h3>
                        <h3>{yogaClass.location}</h3>
                        <h3>{yogaClass.locations.city}, {yogaClass.locations.state} {yogaClass.locations.country}</h3>
                        <div>
                         {sessionUser.id !== yogaClass.teacher.id && 
                            <h3 className='profile__teacher-link'>
                            <NavLink to={`/messages`}>
                                <img className='teacher__img' src={yogaClass.teacher.profile_image} alt='test'/>
                                {yogaClass.teacher.first_name} {yogaClass.teacher.last_name}</NavLink>
                            </h3>}
                        </div>
                        <h3>${yogaClass.price}</h3>
                        <h4 className='profile__description'>{yogaClass.description}</h4>
                    </div>
                </div>
            </div>
            <div className='profile__review-class'>
                {yogaClass.student.some(student => student.id === sessionUser.id) && 
                <div className='review'>
                    <ClassReview />
                </div>
                }
            </div>
                
        </>
    )

}

export default ClassProfile;
