import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, isLoggedIn, setIsLoggedIn }) => {
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <main>{children}</main>
      
    </div>
  );
};

export default Layout;
