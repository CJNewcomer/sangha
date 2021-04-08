import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-dom';
import {convertTime} from '../ClassProfile/ClassProfile';
import { getClass } from '../../store/class';
import './LandingPage.css';


const LandingPage = () => {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");

    const history = useHistory();
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);
    const classes = useSelector((state) => Object.values(state.class));

    useEffect(async () => {
        const response = await fetch("/api/quotes/")
        const data = await response.json()
        setQuote(data.quote);
        setAuthor(data.author);
    }, []);

    useEffect(() => {
        dispatch(getClass())
    }, [dispatch]);

    const myClasses = classes.filter(({student}) => student.some(oneStudent => oneStudent.id === sessionUser.id));

    return (
        <>
        <div className='landing__container'>
            <div className='splash__greeting'>Namaste & Welcome, {sessionUser.first_name}</div>
            <div></div>
                <div className='splash__daily-karma'>
                    <div className='splash__quote'>{quote}
                    <div className='splash__author'>~ {author} ~</div>
                    </div>
                </div>
                    <div></div>
                    <div className='splash__schedule'>
                        <div className='classes_listed'>
                        {!myClasses.length ? <h2>No Classes Booked</h2> : <h2>My Booked Classes</h2>}
                    <div className='classes__main' >
                        <div className='classes__container' >
                            {myClasses.map((myClass) => {
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
                    <div className='splash__pose-day'>
                    </div>
        </div>
        </>
    )
}

export default LandingPage;