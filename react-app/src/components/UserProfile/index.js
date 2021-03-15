import React, {useState, useEffect}from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import './UserProfile.css';


const UserProfile = ({ userProfileImage }) => {
    const history = useHistory();
    const { user_id } = useParams();
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState([]);
    
    const user = useSelector((state) => state.user[user_id]);
    const classes = useSelector((state) => Object.values(state.class));
    const sessionUser = useSelector((state) => state.session.user);
    
    useEffect(() => {
        if (userProfileImage) {
            setImage(userProfileImage.image);
        }
    }, [userProfileImage])

    const createProfileImage = async (e) => {
        e.preventDefault();
        setErrors([]);
        let newErrors = [];

        const user = {
            user_id: sessionUser.id,
            image
        };

        const profileErrors = await dispatchEvent(
            userProfileImage ? createProfileImage(user, userProfileImage.id)
            : createProfileImage(user)
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
            const reader = new FileReader();
            setImage(file);
            reader.onload = (e) => {
                image.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    };
    
    
    // Grabbing all classes booked or taught
    const myClasses = classes.filter((class_) => class_.sessionUser?.id === sessionUser.id);
    console.log("------", myClasses)
    
    if (!sessionUser) return null;

    return (
        <>
            <div className='profile__container-a'>
                <div className='profile__user-a'>
                    <div className='profile__image'>
                        {/* <input className='image__upload' type='file' style={{display: "none"}} onChange={updateFile}/> */}
                        <img src={"https://sangha.s3.us-east-2.amazonaws.com/Default_profile_image.png"} alt=""/>
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
                        <p>{sessionUser.biography}</p>
                    </div>
                </div>
            </div>
            <div className='profile__container-b'>
                {!myClasses.length && <h2>No Classes Booked</h2>}
                <div className='classes__main'>
                    <div className='classes__container'>
                        {myClasses.map((myClass) => {
                            // const {class_image, name, date} = myClass;
                            return (
                                <div
                                key={myClass.sessionUser.id}
                                className='class__tile'
                                onClick={() => {
                                    history.push(`/users/${sessionUser.id}/myclasses/${myClass.id}`);
                                }}>
                                    <div className='myclasses__image'>
                                        <img src={sessionUser.myClasses[0].class_image} alt=""/>
                                    </div>
                                    <div className='myclasses__info'>
                                        <div>
                                            <h3>{sessionUser.myClasses[0].name}</h3>
                                            <h3>{sessionUser.myClasses[0].teacher.first_name}</h3>
                                            <h3>{sessionUser.myClasses[0].date}</h3>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile;