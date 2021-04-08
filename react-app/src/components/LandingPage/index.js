import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import './LandingPage.css';


const LandingPage = () => {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");

    const sessionUser = useSelector((state) => state.session.user);

    useEffect(async () => {
        const response = await fetch("/api/quotes/")
        const data = await response.json()
        setQuote(data.quote);
        setAuthor(data.author);
    }, []);

    return (
        <>
        <div className='landing__container'>
            <div className='splash__greeting'>Namaste & Welcome, {sessionUser.first_name}</div>
            <div></div>
                <div className='splash__daily-karma'>Daily Karma
                    <div className='splash__quote'>{quote}</div>
                    <div className='splash__author'>- {author}</div>
                </div>
                    <div></div>
                    <div className='splash__schedule'>
                    </div>
                    <div className='splash__pose-day'>
                    </div>
        </div>
        </>
    )
}

export default LandingPage;