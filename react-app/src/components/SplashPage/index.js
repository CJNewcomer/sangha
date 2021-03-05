import React from 'react';
import LoginFormModal from '../auth/LoginFormModal/index';
import SignUpFormModal from '../auth/SignUpFormModal/index';
import './SplashPage.css';


const SplashPage = () => {
    return (
        <div className='background__container'>
            <img className='bottom' alt={"lotus"} src={require('./images/lotus_in_rain.jpg')}/>
            <img className='top' alt={"yogis"} src={require('./images/yogis_practicing.jpg')}/>
            <div className='main__intro-title'>
                <h1 className='splash__title'>sangha</h1>
                <h2 className='sanskrit__title'>संघ</h2>
                <h3 className='welcome__title'>grow your practice</h3>
                <h3 className='welcome__title'>join the community</h3>
                <div className='main__intro-container'>
                    <li>
                        <SignUpFormModal />
                    </li>
                    <li>
                        <LoginFormModal />
                    </li>
                </div>
            </div>
        </div>
    )
}

export default SplashPage;
