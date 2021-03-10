import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import './UserProfile.css';


const UserProfile = () => {
    const history = useHistory();
    const { userId } = useParams();

    const user = useSelector((state) => state.users[userId]);
    const classes = useSelector((state) => Object.values(state.classes));

    const myClasses = classes.filter((oneClass) => oneClass.userId === user.id);

    if (!user) return null;

    const { username, first_name, last_name, email, profile_image, is_teacher, biography } = user;

    return (
        <>
            <div>
                <div>
                    <div>
                        <div>
                            <img src={profile_image} alt="User Profile"/>
                        </div>
                        <div>
                            <i>{username}</i>
                        </div>
                        <div>
                            <i>{first_name} {last_name}</i>
                        </div>
                        <div>
                            <i>{email}</i>
                        </div>
                        <div>
                            <p>{biography}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile;