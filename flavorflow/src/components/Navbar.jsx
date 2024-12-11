import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/flavorflow.png';
import { RiTeamLine, RiTeamFill, RiMapPin2Line, RiMapPin2Fill, RiLoginCircleLine, RiLoginCircleFill, RiLogoutCircleLine, RiLogoutCircleFill } from "react-icons/ri";
import { IoPersonOutline, IoPersonSharp } from "react-icons/io5";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    navigate('/'); // Redirect to home after logging out
    toast.success('Logged out successfully!', {
      autoClose: 3000,
      onOpen: () => console.log('Toast Opened'),
      onClose: () => console.log('Toast Closed'),
    });
  };

  const handleLogin = () => {
    navigate('/login'); // Redirect to login page
  };

  const handleSignup = () => {
    navigate('/signup'); // Redirect to signup page
  };

  const onLoginOrSignupPage = location.pathname === '/login' || location.pathname === '/signup';
  const currentPage = location.pathname;

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate('/')}>
        <img id="homePageLogo" src={logo} alt="logo" />
        <p id="appName">Flavorflow</p>
      </div>
      <button className="hamburger-menu" onClick={toggleMenu}>
        ☰
      </button>
      <ul className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
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
        <div className="navbar-actions">
          {isLoggedIn ? (
            <>
              <button className="navbar-button" id="logout-button" onClick={handleLogout}>
                <div className="icon-container">
                  <RiLogoutCircleLine className="icon-line" />
                  <RiLogoutCircleFill className="icon-fill" />
                </div>
                Log Out
              </button>
              <button className="navbar-button profile-button" onClick={() => navigate('/profile')} id={currentPage === '/profile' ? 'active' : ''}>
                <div className="icon-container">
                  <IoPersonOutline className="icon-line" />
                  <IoPersonSharp className="icon-fill" />
                </div>
                My Profile
              </button>
            </>
          ) : (

              !onLoginOrSignupPage && (
                <button className="navbar-button login-button" onClick={handleLogin}>
                  <div className="icon-container">
                    <RiLoginCircleLine className="icon-line"/>
                    <RiLoginCircleFill className="icon-fill"/>
                  </div>
                  Login / Signup
                </button>
              )
          )}
          
        </div>
      </ul>
    </nav>
    
  );
}

export default Navbar;
