import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/flavorflow.png';

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


  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate('/')}>
        {/* FlavorFlow */}
        <img id="homePageLogo" src={logo} alt="logo" />
      </div>
      <ul className="navbar-links">
        <li onClick={() => navigate('/filter')}>Map</li>
        <li onClick={() => navigate('/meet-the-team')}>Meet the Team</li>
        {/* <li onClick={() => navigate('/map')}>Test page for map</li> */}
      </ul>
      <div className="navbar-actions">
        {isLoggedIn ? (
          <>
            <button className="navbar-button" onClick={handleLogout}>
              Log Out
            </button>
            <button
              className="navbar-button"
              onClick={() => navigate('/profile')}
            >
              My Profile
            </button>
          </>
        ) : (
          !onLoginOrSignupPage && (
            <button className="navbar-button navbar-button-login" onClick={handleLoginSignup}>
              Login / Signup
            </button>
          )
        )}
      </div>
    </nav>
  );
}

export default Navbar;
