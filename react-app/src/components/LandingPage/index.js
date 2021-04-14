import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import './LandingPage.css';


const LandingPage = () => {
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");


    const sessionUser = useSelector((state) => state.session.user);

    useEffect(async() => {
        const response = await fetch("/api/quotes/")
        const data = await response.json()
        setQuote(data.quote);
        setAuthor(data.author);
    }, []);


    return (
        <>
        <div className='landing__container'>
            <div className='splash__greeting'>Namaste & Welcome, {sessionUser.first_name}</div>
                <div className='splash__daily-karma'>
                    <div className='splash__quote'>{quote}
                    <div className='splash__author'>~ {author} ~</div>
                    </div>
                </div>
                <div className='splash__container'>
                    <img className='warrior__yogis' src="https://sangha.s3.us-east-2.amazonaws.com/dylan-gillis-YJdCZba0TYE-unsplash+(2).jpg"/>
                    <img className='outside__yogis' src="https://sangha.s3.us-east-2.amazonaws.com/annemarie-gruden-fR4EvVarw7o-unsplash.jpg"/>
                    <img className='group__meditate' src="https://sangha.s3.us-east-2.amazonaws.com/erik-brolin-ZARfCYDaVg0-unsplash.jpg"/>
                </div>
        </div>
        </>
    )
}

export default LandingPage;