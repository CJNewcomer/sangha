import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import LogoutButton from './LogoutButton';

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;

  if (!!sessionUser) {
    sessionLinks = (
      <>
      <li className='navbar__item'>
        <NavLink to="/search" exact={true} activeClassName='active'>
          Search for Community
        </NavLink>
      </li>
      <li className='navbar__item'>
        <ProfileButton user={sessionUser}/>
      </li>
      </>
    );
  } 
    // <nav>
    //   <ul>
    //     <li>
    //       <NavLink to="/" exact={true} activeClassName="active">
    //         Home
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink to="/users" exact={true} activeClassName="active">
    //         Users
    //       </NavLink>
    //     </li>
    //     <li>
    //       <LogoutButton  />
    //     </li>
    //   </ul>
    // </nav>
  return (
    <ul className='nav__main-menu'>{sessionLinks}
      <li className='menu__go'>
        <a className='menu__icon'><span>Menu</span></a>
        <nav className='menu__wrapper'>
          <div className='menu__scroll'>
            <ul className='menu'>
              <li className='search__item'>
                <input className='search' type='search' placeholder='Search'/>
                <a className='search__icon'>
                  <i class="fas fa-search"></i></a>
              </li>
              <li>
                <a className='profile_icon'>
                  <i class="fas fa-user"></i>My Profile</a>
                <ul className='sub__menu'>
                  <li><a className='class_icon'>
                    <i class="fas fa-chalkboard-teacher"></i>My Classes</a></li>
                  <li><a className='message_icon'>
                    <i class="fas fa-comments"></i>My Messages</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </li>
    </ul>
  );
}

export default NavBar;