import React from 'react';
import { useSelector }from 'react-redux';
import SignUpFormModal from '../auth/SignUpFormModal';
import LoginFormModal from '../auth/LoginFormModal';
import './SplashPage.css';


const SplashPage = () => {
    const sessionUser = useSelector((state) => state.session.user)

    let loggedOutUser;

    if (!sessionUser) {
        loggedOutUser = (
            <>
                <div className='welcome__buttons'>
                    <li className='nav__list-item'>
                        <SignUpFormModal />
                    </li>
                    <li className='nav__list-item'>
                        <LoginFormModal />
                    </li>
            </div>
            </>
        )
    }

    return (
        <div className='background__container'>
            <img className='bottom' alt="lotus" src='https://sangha.s3.us-east-2.amazonaws.com/lotus_in_rain.jpg'/>
            <img className='top' alt="yogis" src='https://sangha.s3.us-east-2.amazonaws.com/anjaneyasana.jpg'/>
            <div className='splash__title'>
                <h1>sangha</h1>
            </div>
            <div className='sanskrit__title'>
                <h2>संघ</h2>
            </div>
            <div className='welcome__title-a'>
                <h3>grow your practice</h3>
            </div>
            <div className='welcome__title-b'>
                <h3>join the community</h3>
            </div>
            <div>{loggedOutUser}</div>
        </div>
    )
}

export default SplashPage;
