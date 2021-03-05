import React from 'react';
// import NavBar from '../NavBar';
import './LandingPage.css';


const LandingPage = () => {
    return (
        <div className='landing__container'>
            <img className='landing' alt={"yogis"} src={require('./images/yogis_practicing.jpg')}/>
        </div>
    )
}

export default LandingPage;