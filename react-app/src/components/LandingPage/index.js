import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
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
                <div className='splash__daily-karma'>
                    <div className='splash__quote'>{quote}
                    <div className='splash__author'>~ {author} ~</div>
                    </div>
                </div>
            <div></div>
            <div className='splash__walkthroughs'>
                <div className='splash__video'>
                    <div style={{   width: '100%',
                                    height:'0',
                                    paddingBottom:'63%',
                                    position:'relative' }}>
                        <iframe src="https://giphy.com/embed/PgGs8wYTRfucQQhYY0" 
                         style={{   width:"100%", 
                                    height:"100%", 
                                    position:"absolute",
                                    frameBorder:"0"}} 
                                    className="giphy-embed" allowFullScreen></iframe>
                    </div>
                    <p>
                        <a href="https://giphy.com/gifs/PgGs8wYTRfucQQhYY0">via GIPHY</a>
                    </p>
                    </div>
                <div className='splash__video'>
                    <div style={{   width:'100%',
                                    height:'0',
                                    paddingBottom:'63%',
                                    position:'relative' }}>
                        <iframe src="https://giphy.com/embed/MqpRLONoiBZtS0bfkN" 
                         style={{   width:"100%", 
                                    height:"100%", 
                                    position:'absolute', 
                                    frameBorder:"0"}} 
                                    className="giphy-embed" allowFullScreen></iframe>
                    </div>
                    <p>
                        <a href="https://giphy.com/gifs/MqpRLONoiBZtS0bfkN">via GIPHY</a>
                    </p>
                </div>
                <div className='splash__video'>
                    <div style={{   width:'100%',
                                    height:'0',
                                    paddingBottom:'63%',
                                    position:'relative' }}>
                        <iframe src="https://giphy.com/embed/hz2IlP7YAv7oRziu1z" 
                         style={{   width:"100%", 
                                    height:"100%", 
                                    position:'absolute', 
                                    frameBorder:"0"}} 
                                    className="giphy-embed" allowFullScreen></iframe>
                    </div>
                    <p>
                        <a href="https://giphy.com/gifs/hz2IlP7YAv7oRziu1z">via GIPHY</a>
                    </p>
                </div>
            </div>
        </div>
        </>
    )
}

export default LandingPage;