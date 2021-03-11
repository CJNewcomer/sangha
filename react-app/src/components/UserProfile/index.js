import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import './UserProfile.css';


const UserProfile = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { userId } = useParams();
    
    const user = useSelector((state) => state.users[userId]);
    const classes = useSelector((state) => Object.values(state.classes));
    const sessionUser = useSelector((state) => state.session.user);

    // Grabbing all classes booked or taught
    const myClasses = classes.filter((oneClass) => oneClass.userId === sessionUser.id);
    
    if (!user) return null;

    return (
        <>
            <div className='profile__container'>
                <div className='profile__user'>
                    <div className='profile__user-info'>
                        <div className='profile__image'>
                            <img src={user.profile_image} alt="User Profile"/>
                        </div>
                        <div className='profile__username'>
                            <i>{user.username}</i>
                        </div>
                        <div className='profile__name'>
                            <i>{user.first_name} {user.last_name}</i>
                        </div>
                        <div className='profile__email'>
                            <i>{user.email}</i>
                        </div>
                        <div className='profile__bio'>
                            <p>{user.biography}</p>
                        </div>
                        <div>
                            {!myClasses.length && <h2>No Classes Booked</h2>}
                        </div>
                    </div>
                </div>
            </div>
            <div className='classes__main'>
                <div classes__container>
                    {myClasses.map((myClass) => {
                        const {class_image, name, date} = myClass;
                        return (
                            <div
                            key={myClass.userId}
                            className='class__tile'
                            onClick={() => {
                                history.push(`/classes/${myClass.id}`);
                            }}>
                                <div>
                                    <img src={class_image} alt=""/>
                                    <div>
                                        <h3>{name}</h3>
                                        <h3>{user.teacher.first_name}</h3>
                                        <h3>{date}</h3>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </>
    )
}

export default UserProfile;