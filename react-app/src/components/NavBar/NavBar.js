import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/session";

import './NavBar.css'


const NavBar = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const onLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout());
  }

  let sessionLinks;

  if (!sessionUser) {
    sessionLinks = (
      <>
        <div className='area'></div>
        <nav className='main__menu'>
          <ul>
            <li>
              <a href="/home">
                <i className="fas fa-home fa-2x"></i>
                <span className='nav__text'>
                  Home
                </span>
              </a>
            </li>
            <li className='has__subnav'>
              <a href="/search">
                <i className="fas fa-search fa-2x"></i>
                <span className='nav__text'>
                  Search
                </span>
              </a>
            </li>
          </ul>
        </nav>  
      </>
    )
  } else {
    sessionLinks = (
      <>
        <div className='area'></div>
        <nav className='main__menu'>
            <ul>
              <li>
                <a href="/home">
                  <i className="fa fa-home fa-2x"></i>
                  <span className='nav__text'>
                    Home
                  </span>
                </a>
              </li>
              <li>
                <a href="/about">
                  <i className="fa fa-info"></i>
                  <span className='nav__text'>
                    About the Developer
                  </span>
                </a>
              </li>
              <li className='has__subnav'>
                <a href="/search">
                  <i className="fa fa-search fa-2x"></i>
                  <span className='nav__text'>
                    Search
                  </span>
                </a>
              </li>
              <li className='has__subnav'>
                <a href={`/users/${sessionUser.id}`}>
                  <i className="fa fa-user fa-2x"></i>
                  <span className='nav__text'>
                    {`${sessionUser.first_name}'s `} Profile
                  </span>
                </a>
              </li>
              <li className='has__subnav'>
                {sessionUser.is_teacher ? 
                <a href="/classes">
                  <i className="fa fa-chalkboard-teacher fa-2x"></i>
                  <span className='nav__text'>
                    Create a New Class
                  </span>
                </a> : 
      
                <a href={`/users/${sessionUser.id}/myclasses`}>
                  <i className="fa fa-chalkboard-teacher fa-2x"></i>
                  <span className='nav__text'>
                    {`${sessionUser.first_name}'s `} Classes
                  </span>
                </a> }
            </li>
              <li className='has__subnav'>
                <a href={`/users/${sessionUser.id}/mymessages`}>
                  <i className="fa fa-comments fa-2x"></i>
                  <span className='nav__text'>
                    {`${sessionUser.first_name}'s `} Messages
                  </span>
                </a>
              </li>
            </ul>
            <ul>
              <li className='has__subnav'>
                <a onClick={onLogout} href="/">
                  <i className="fa fa-power-off fa-2x"></i>
                  <span className='nav__text'>
                    Logout
                  </span>
                </a>
              </li>
            </ul>
          </nav>
      </>
    )
  }


    return (
      <>
        <div className='area'></div>
        <nav className='main__menu'>
          <ul>
          <div>{sessionLinks}</div>          
          </ul>
        </nav>
      </>
    )       
} 

export default NavBar;