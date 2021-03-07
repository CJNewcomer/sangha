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
    <header className='box'>
      <div className='curve'>
        <ul className='nav__wrapper'>{sessionLinks}</ul>
      </div>
    </header>
  );
}

export default NavBar;