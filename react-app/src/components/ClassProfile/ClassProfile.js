import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, NavLink } from 'react-router-dom';
import { getClass, deleteClass } from '../../store/class';
import './ClassProfile.css';

import CreateClassForm from '../CreateClassForm';

const ClassProfile = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {classId} = useParams();

    const yogaClass = useSelector((state) => state.class[classId]);
    const sessionUser = useSelector((state) => state.session.user);
    

    useEffect(() => {
        dispatch(getClass())
    }, [dispatch])


    const onDelete = (e) => {
        const res = window.confirm(`Are you sure you want to delete ${yogaClass.name}?`)
        if (res) {
            dispatch(deleteClass(yogaClass.id))
            history.push(`/classes/${yogaClass.id}`)
        }
    }

    // useEffect(() => {
    //     const {
    //         name,
    //         type,
    //         class_image,
    //         date,
    //         time,
    //         location,
    //         description,
    //         price,
    //     } = yogaClass;

    // })


    if (!yogaClass) return null;

    return (
        <>
            <div className='profile__container'>
                <div className='profile__left'>
                    <img src={yogaClass.class_image} alt="Class Profile"/>
                        <div className='profile__update-class'>
                            {sessionUser.id === yogaClass.teacher.id && 
                            <div>
                            <CreateClassForm updateOneClass={yogaClass} />
                            <button
                                className='profile__delete-class'
                                onClick={onDelete}>Delete Class</button>
                            </div>
                            }
                        </div>
                </div>
                <div className='profile__right'>
                    <div className='profile__info'>
                        <h2>{yogaClass.name}</h2>
                        <h3>{yogaClass.type}</h3>
                        <h3>{yogaClass.date} {yogaClass.time}</h3>
                        <h3>{yogaClass.location}</h3>
                        <h3>{yogaClass.location.city}, {yogaClass.location.state} {yogaClass.locations.country}</h3>
                        <h3>
                            <NavLink to={`/users/${yogaClass.teacher.id}`}>Teacher: {yogaClass.teacher.first_name}</NavLink>
                        </h3>
                        <h3>${yogaClass.price}</h3>
                        <h4>{yogaClass.description}</h4>
                    </div>
                </div>
            </div>
        </>
    )

}

export default ClassProfile;
