import React from 'react';
import SignUpFormModal from '../auth/SignUpFormModal';
import LoginFormModal from '../auth/LoginFormModal';
import './SplashPage.css';


const SplashPage = () => {

    return (
        <div className='background__container'>
            <img className='bottom' alt={"lotus"} src={require('./images/lotus_in_rain.jpg')}/>
            <img className='top' alt={"yogis"} src={require('./images/anjaneyasana.jpg')}/>
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
            <div className='welcome__buttons'>
                <li className='nav__list-item'>
                    <SignUpFormModal />
                </li>
                <li className='nav__list-item'>
                    <LoginFormModal />
                </li>
            </div>
        </div>
    )
}

export default SplashPage;
