import React from 'react';

const NavBar = () => {
  
    return (
      <div className='main__area'>
        <nav className='main__menu'>
          <ul>
            <li>
              <a href='/home'>
                <i className="fas fa-compass"></i>
                <span className='nav__text'>
                  DashBoard
                </span>
              </a>
            </li>
            <li className='has__subnav'>
              {/* <input className='search' type='search' placeholder='Search'/> */}
              <a href='/search'>
                <i className="fas fa-search"></i>
                <span className='nav__text'>
                  Search
                </span>
              </a>
            </li>
            <li className='has__subnav'>
              <a href='/users'>
                <i className="fas fa-user"></i>
                <span className='nav__text'>
                  My Profile
                </span>
              </a>
            </li>
            <li className='has__subnav'>
              <a href='/classes'>
                <i className="fas fa-chalkboard-teacher"></i>
                <span className='nav__text'>
                  My Classes
                </span>
              </a>
            </li>
            <li className='has__subnav'>
              <a href='/messages'>
                <i className="fas fa-comments"></i>
                <span className='nav__text'>
                  My Messages
                </span>
              </a>
            </li>
            <li className='has__subnav'>
              <a href='/'>
                <i className="fas fa-power-off"></i>
                <span className='nav__text'>
                  Logout
                </span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    )       
} 

export default NavBar;