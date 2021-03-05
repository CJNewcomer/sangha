import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../store/session';

const UserDropdown = () => {
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    const openMenu = () => {
        let open = true;
        if (showMenu) open = false;
        setShowMenu(open);
    };

    const logoutUser = async (e) => {
        e.preventDefault();
        await dispatch(logout());
    };

    return (
        <>
            <button onClick={openMenu}>
                <i className="fas fa-spa"></i>
            </button>
            {showMenu && (
                <ul>
                    <li className='navbar__dropdown-item'>{sessionUser.username}</li>
                    <li className='navbar__dropdown-item'>{sessionUser.email}</li>
                    <li className='navbar__dropdown-item'>
                        <NavLink to={`/users/${sessionUser.id}`}
                        exact={true} activeClassName='active'>Profile</NavLink>
                    </li>
                    <li className='navbar__dropdown-item'>
                        <NavLink to='/search' exact={true} activeClassName='active'>
                        Search for Community</NavLink>
                    </li>
                    <li>
                        <button className='navbar__dropdown-item' onClick={logoutUser}
                        >Log Out</button>
                    </li>
                </ul>
            )}
        </>    
    )
}

export default UserDropdown;