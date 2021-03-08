import React from "react";

const NavBar = () => {
  
    return (
      <>
        <main className="main__menu">
          <ul className="menu__list">
            <li>
              <a className="menu__anchor"href="/home">
                {/* <i className="fas fa-compass"></i> */}
                {/* <span className="nav__text">
                  DashBoard
                </span> */}
              </a>
            </li>
            <li>
              {/* <input className="search" type="search" placeholder="Search"/> */}
              <a className="menu__anchor" href="/search">
                {/* <i className="fas fa-search"></i> */}
                {/* <span className="nav__text">
                  Search
                </span> */}
              </a>
            </li>
            <li>
              <a className="menu__anchor" href="/users">
                {/* <i className="fas fa-user"></i> */}
                {/* <span className="nav__text">
                  My Profile
                </span> */}
              </a>
            </li>
            <li>
              <a className="menu__anchor" href="/classes">
                {/* <i className="fas fa-chalkboard-teacher"></i> */}
                {/* <span className="nav__text">
                  My Classes
                </span> */}
              </a>
            </li>
            <li>
              <a className="menu__anchor" href="/messages">
                {/* <i className="fas fa-comments"></i> */}
                {/* <span className="nav__text">
                  My Messages
                </span> */}
              </a>
            </li>
            <li>
              <a className="menu__anchor" href="/">
                {/* <i className="fas fa-power-off"></i> */}
                {/* <span className="nav__text">
                  Logout
                </span> */}
              </a>
            </li>
          </ul>
        </main>
        <section>
          <input type="checkbox" id="myInput" />
            <label htmlFor="myInput">
              <span className="bar top"></span>
              <span className="bar middle"></span>
              <span className="bar bottom"></span>
            </label>
        </section>
      </>
    )       
} 

export default NavBar;