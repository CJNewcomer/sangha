import React from 'react';

const NavBar = () => {
  
    return (
      <nav className='nav__container'>
        <ul className='nav'>
          <li className='nav__items'>
            <a href='/home' className='menu__home'>
              <i className="fas fa-compass"></i></a>
          </li>
          <li className='nav__items'>
            {/* <input className='search' type='search' placeholder='Search'/> */}
            <a href='/search'className='menu__search'>
              <i className="fas fa-search"></i></a>
          </li>
          <li className='nav__items'>
            <a href='/users' className='menu__profile'>
              <i className="fas fa-user"></i>
            </a>
          </li>
          <li className='nav__items'>
            <a href='/classes' className='menu__class'>
              <i className="fas fa-chalkboard-teacher"></i>
            </a>
          </li>
          <li className='nav__items'>
            <a href='/messages' className='menu__message'>
              <i className="fas fa-comments"></i>
            </a>
          </li>
        </ul>
      </nav>
 
    )       
} 

export default NavBar;