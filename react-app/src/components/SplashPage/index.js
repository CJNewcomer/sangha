import React from 'react';
import './SplashPage.css';


const SplashPage = () => {
    return (
        <div className='background__container'>
            <img className='bottom' alt={"lotus"} src={require('./images/lotus_in_rain.jpg')}/>
            <img className='top' alt={"yogis"} src={require('./images/yogi_practice.jpg')}/>
                <div className='main__intro-title'>
                    <h1 className='splash__title'>Sangha</h1>
                    <h2 className='sanskrit__title'>संघ</h2>
                    <h3 className='welcome__title'>Grow Your Practice</h3>
                    <h3 className='welcome__title'>Join The Community</h3>
                    <div className='main__intro-container'>
                        
                    </div>

                </div>
        </div>
    )
}

export default SplashPage;
