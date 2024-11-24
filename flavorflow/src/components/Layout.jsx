import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import '../styles/Layout.css';

const Layout = ({ children, isLoggedIn, setIsLoggedIn }) => {
  return (
    <div className="layout-container">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <main className="layout-content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
