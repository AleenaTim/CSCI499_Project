import React from 'react';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">FlavorFlow</div>
      <ul className="navbar-links">
        <li>Restaurants</li>
        <li>Meet The Team</li>
      </ul>
      <div className="navbar-actions">
        <button className="navbar-button">Log In</button>
        <button className="navbar-button navbar-button-signup">Sign Up</button>
      </div>
    </nav>
  );
}

export default Navbar;
