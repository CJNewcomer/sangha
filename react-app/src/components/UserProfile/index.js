import React, {useState, useEffect}from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getClass } from '../../store/class';
import { updateOneUser } from '../../store/session';
import './UserProfile.css';
import { convertTime } from '../ClassProfile/ClassProfile';

const UserProfile = ({ userProfileImage }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { user_id } = useParams();
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState([]);
    
    const user = useSelector((state) => state.user[user_id]);
    const classes = useSelector((state) => Object.values(state.class));
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(getClass());
    }, [dispatch])
    
    useEffect(() => {
        if (userProfileImage) {
            setImage(userProfileImage.image);
        }
    }, [userProfileImage])

    const createProfileImage = async (image) => {
        console.log("-----------",image)
        setErrors([]);
        let newErrors = [];

        const user = {
            id: sessionUser.id,
            image
        };

        const profileErrors = await dispatch (
            userProfileImage ? updateOneUser(user, userProfileImage.id)
            : updateOneUser(user)
        );
        if (profileErrors.errors) {
            newErrors = profileErrors.errors;
            setErrors(newErrors);
        } else {
            history.push(`/users/${profileErrors.id}`);
        }
    };

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            createProfileImage(file);
        }
    };
    
    
    // Grabbing all classes booked or taught
    const myClasses = classes.filter(({student}) => student.some(oneStudent => oneStudent.id === sessionUser.id));
    const taughtClasses = classes.filter(({teacher}) => teacher.id === sessionUser.id)
    
    if (!sessionUser) return null;

    return (
        <>
            <div className='profile__container-a'>
                <div className='profile__user-a'>
                    <div className='profile__image'>
                        <input className='image__upload' type='file' id='uploaded' style={{display: "none"}} onChange={updateFile}/>
                        <img src={sessionUser.profile_image} alt=""/>
                        <button onClick={() => document.getElementById('uploaded').click()}></button>
                    </div>
                    <div className='profile__user-info'>
                        <div className='profile__username'>
                            <i>{sessionUser.username}</i>
                        </div>
                        <div className='profile__name'>
                            <i>{sessionUser.first_name} {sessionUser.last_name}</i>
                        </div>
                        <div className='profile__email'>
                            <i>{sessionUser.email}</i>
                        </div>
                        <div></div>
                        <div className='profile__location'>
                            <i>{sessionUser.classes.location_id}</i>
                        </div>
                    </div>
                </div>
                <div className='profile__user-b'>
                    <div className='profile__bio'>
                        {/* <p>{sessionUser.biography}</p> */}
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                            enim ad minim veniam, quis nostrud exercitation ullamco laboris
                            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                            in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                            nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                            sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>
            </div>
            <div className='profile__container-b'>
                <div>
                {!myClasses.length ? <h2>No Classes Booked</h2> : <h2>My Booked Classes</h2>}
                    <div className='classes__main'>
                        <div className='classes__container'>
                            {myClasses.map((myClass) => {
                                // const {class_image, name, date} = myClass;
                                return (
                                    <div
                                    key={myClass.id}
                                    className='class__tile'
                                    onClick={() => {
                                        history.push(`/classes/${myClass.id}`);
                                    }}>
                                        <div className='myclasses__image'>
                                            <img src={myClass.class_image} alt=""/>
                                        </div>
                                    <div>
                                        <div className='myclasses__info'>
                                            <h3>{myClass.name}</h3>
                                            <h3>{myClass.teacher.first_name}</h3>
                                            <h3>{(new Date(myClass.time)).toLocaleString("en-US", convertTime)}</h3>
                                        </div>
                                    </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className='profile__container-c'>
                <div>
                {!taughtClasses.length ? <h2>No Classes Taught</h2> : <h2>My Taught Classes</h2>}
                    <div className='classes__main'>
                        <div className='classes__container'>
                            {taughtClasses.map((taughtClass) => {
                                // const {class_image, name, date} = myClass;
                                return (
                                    <div
                                    key={taughtClass.id}
                                    className='class__tile'
                                    onClick={() => {
                                        history.push(`/classes/${taughtClass.id}`);
                                    }}>
                                        <div className='myclasses__image'>
                                            <img src={taughtClass.class_image} alt=""/>
                                        </div>
                                    <div>
                                        <div className='myclasses__info'>
                                            <h3>{taughtClass.name}</h3>
                                            <h3>{taughtClass.teacher.first_name}</h3>
                                            <h3>{(new Date(taughtClass.time)).toLocaleString("en-US", convertTime)}</h3>
                                        </div>
                                    </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default UserProfile;