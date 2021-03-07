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
    const { username, first_name, last_name, email, profile_image, is_teacher } = user;
    return (
        <>

        </>
    )
}

export default UserProfile;