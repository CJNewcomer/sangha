import React from "react";
import { useSelector } from "react-redux";
import SignUpFormModal from "../auth/SignUpFormModal";
import LoginFormModal from "../auth/LoginFormModal";
import LogoutButton from "../NavBar/LogoutButton";
// import { NavLink } from "react-router-dom";

import './NavBar.css'


const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);

  const openNav = () => {
    document.getElementById("awesomeSideNav").style.width = "25rem";
  }

  const closeNav = () => {
    document.getElementById("awesomeSideNav").style.width = "0";
  }

  let sessionLinks;

  if (!sessionUser) {
    sessionLinks = (
      <>
        <div className='side__nav' id="awesomeSideNav">
          <a href="" onClick={openNav}> &#x2630;</a>
          <a href="javascript:void(0)" className="close__button" onClick={closeNav}>&times;</a>
          <a className="menu__anchor" href="/search">
            <i className="fas fa-search"></i>
          </a>
            {/* <li className='nav__list-search'>
                <NavLink 
                className="menu__anchor" 
                to="/search" 
                exact={true}
                activeClassName='active'>
                    <i className="fas fa-search"></i>
                    Search
                </NavLink>
            </li> */}
            <li className='nav__list-item'>
                <SignUpFormModal />
            </li>
            <li className='nav__list-item'>
                <LoginFormModal />
            </li>
        </div>
      </>
    )
  } else {
    sessionLinks = (
      <>
        <div className='side__nav' id='awesomeSideNav'>
          <a href="" onClick={openNav}> &#x2630;</a>
          <a className="close__button" onClick={closeNav}>&times;</a>
          <a className="menu__anchor" href="/search">
            <i className="fas fa-search"></i>
          </a>
          <a className="menu__anchor" href={`/users/${sessionUser.id}`}>
            <i className="fas fa-user"></i>
          </a>
          <a className="menu__anchor"  href={`/users/${sessionUser.id}/myclasses`} >
            <i className="fas fa-chalkboard-teacher"></i>
          </a>
          <a className="menu__anchor" href={`/users/${sessionUser.id}/mymessages`} >
            <i className="fas fa-comments"></i>
          </a>
          <a className="menu__anchor"  href="/">
            <i className="fas fa-power-off"></i>
          </a>

          {/* <li>
            <NavLink 
            className="menu__anchor" 
            to="/search"
            exact={true}
            activeClassName='active'>
              <i className="fas fa-search"></i>
               Search
            </NavLink>
          </li> */}
          {/* <li>
            <NavLink 
            className="menu__anchor" 
            to={`/users/${sessionUser.id}`}
            exact={true}
            activeClassName='active'>
              <i className="fas fa-user"></i>
               My Profile
            </NavLink>
          </li> */}
          {/* <li>
            <NavLink 
            className="menu__anchor" 
            to={`/users/${sessionUser.id}/myclasses`} 
            exact={true}
            activeClassName='active'>
              <i className="fas fa-chalkboard-teacher"></i>
               My Classes
            </NavLink>
          </li> */}
          {/* <li>
            <NavLink 
            className="menu__anchor" 
            to={`/users/${sessionUser.id}/mymessages`} 
            exact={true}
            activeClassName='active'>
              <i className="fas fa-comments"></i>
               My Messages
            </NavLink>
          </li> */}
          {/* <li>
            <NavLink 
            className="menu__anchor" 
            to="/">
              <i className="fas fa-power-off"></i>
               Logout
            </NavLink>
          </li> */}
          <li>
            <LogoutButton />
          </li>
        </div>
      </>
    )
  }


    return (
      <>
        <div className='side__nav' id='awesomeSideNav'>
          <a className="menu__anchor" href="" onClick={openNav}> &#x2630;</a>
          <a className="menu__anchor" href="" className="close__button" onClick={closeNav}>&times;</a>
          <a className="menu__anchor" href="/home">
            <img className='nav__logo' alt={"logo"} src={require('./images/sangha_logo.png')} />
          </a>    
          <div>{sessionLinks}</div>          
        </div>
      </>
    )       
} 

export default NavBar;