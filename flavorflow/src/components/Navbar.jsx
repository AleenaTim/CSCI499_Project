import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/flavorflow.png';
import { RiTeamLine, RiTeamFill, RiMapPin2Line, RiMapPin2Fill, RiLoginCircleLine, RiLoginCircleFill, RiLogoutCircleLine, RiLogoutCircleFill } from "react-icons/ri";
import { IoPersonOutline, IoPersonSharp } from "react-icons/io5";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/'); // Redirect to home after logging out
  };

  const handleLoginSignup = () => {
    navigate('/login'); // Redirect to login or signup page
  };

  // Determine if the user is on the login or signup page
  const onLoginOrSignupPage = location.pathname === '/login' || location.pathname === '/signup';

  // Determine the current page
  const currentPage = location.pathname;

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate('/')}>
        {/* FlavorFlow */}
        <img id="homePageLogo" src={logo} alt="logo" />
      </div>
      <ul className="navbar-links">
        <li onClick={() => navigate('/filter')} className={currentPage === '/filter' ? 'active' : ''}>
        <div className="icon-container">
          <RiMapPin2Line className="icon-line" />
          <RiMapPin2Fill className="icon-fill" />
        </div>
          Map
        </li>
        <li id="team" onClick={() => navigate('/meet-the-team')} className={currentPage === '/meet-the-team' ? 'active' : ''}>
        <div className="icon-container">
          <RiTeamLine className="icon-line" />
          <RiTeamFill className="icon-fill" />
        </div>
          Meet the team
        </li>
        {/* <li onClick={() => navigate('/map')}>Test page for map</li> */}
      </ul>
      <div className={`navbar-actions ${currentPage ==='/profile' ? 'profileButton' : ''} `}>
        {isLoggedIn ? (
          <>
            <button className="navbar-button" onClick={handleLogout}>
            <div className="icon-container">
              <RiLogoutCircleLine className="icon-line"/>
              <RiLogoutCircleFill className="icon-fill"/>
            </div>
              Log Out
            </button>
            <button className="navbar-button" onClick={() => navigate('/profile')}>
            <div className="icon-container">
              <IoPersonOutline className="icon-line"/>
              <IoPersonSharp className="icon-fill"/>
            </div>
              My Profile
            </button>
          </>
        ) : (
          !onLoginOrSignupPage && (
            <button className="navbar-button navbar-button-login" onClick={handleLoginSignup}>
              <div className="icon-container">
                <RiLoginCircleLine className="icon-line"/>
                <RiLoginCircleFill className="icon-fill"/>
              </div>
              Login / Signup
            </button>
          )
        )}
      </div>
    </nav>
  );
}

export default Navbar;
