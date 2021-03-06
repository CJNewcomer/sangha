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
      <header className='main__container'>
      <nav className='main__nav'>{sessionLinks}
        <ul className='menu'>
          <li>
            <a className='menu__home'>
              <i className="fas fa-compass"></i><span>Home</span>
            </a>
          </li>
          <li>
            <input className='search' type='search' placeholder='Search'/>
            <a className='menu__search'>
              <i className="fas fa-search"></i>
            </a>
          </li>
          <li>
            <a className='menu__profile'>
              <i className="fas fa-user"></i><span>My Profile</span>
            </a>
          </li>
          <li>
            <a className='menu__class'>
              <i className="fas fa-chalkboard-teacher"></i><span>My Classes</span>
            </a>
          </li>
          <li>
            <a className='menu__message'>
              <i className="fas fa-comments"></i><span>My Messages</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>  
    )       
} 

export default NavBar;