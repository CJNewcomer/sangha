import React from 'react';
import { useSelector } from 'react-redux';
import SignUpFormModal from '../auth/SignUpFormModal';
import LoginFormModal from '../auth/LoginFormModal';
import LogoutButton from '../NavBar/LogoutButton';

import './SplashPage.css';


const SplashNavigation = () => {
    const sessionUser = useSelector((state) => state.session.user);

    let sessionLinks;

    if (!sessionUser) {
        sessionLinks = (
            <>
                <div>
                    <nav>
                        <li className='nav__list-item'>
                            <a className="menu__anchor" href="/search">
                                <i className="fas fa-search">
                                    <span className="nav__text">Search</span>
                                </i>
                            </a>
                        </li>
                    </nav>
                    <nav>
                        <li className='nav__list-item'>
                            <SignUpFormModal />
                        </li>
                    </nav>
                    <nav>
                        <li className='nav__list-item'>
                            <LoginFormModal />
                        </li>
                    </nav>
                </div>
            </>
        )
    } else {
        sessionLinks = (
            <>
                <div>
                    <LogoutButton />
                </div>
            </>
        )
    }

    return (
        <div className='splash__header'>
            <div className='splash__wrapper-header'>
                <a className='splash__link' href="/">
                    <img className='splash__logo' alt={"logo"} src={require('./images/sangha_logo.png')}>
                    </img>
                </a>
                <nav className='splash__nav'>
                    <ul className='splash__wrapper'>{sessionLinks}</ul>
                </nav>
            </div>
        </div>

    );
}

export default SplashNavigation;