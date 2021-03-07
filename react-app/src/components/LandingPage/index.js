import React from 'react';
import { useSelector } from 'react-redux';
import NavBar from "../NavBar/NavBar";
import './LandingPage.css';


const LandingPage = () => {
    const sessionUser = useSelector((state) => state.session.user);

    return (
        <>
            <div className='landing__container'>
                <NavBar authenticated={!!sessionUser} />
                <img className='landing' alt={"yogis"} src={require('./images/yogis_practicing.jpg')}/>
            </div>
        </>
    )
}

export default LandingPage;