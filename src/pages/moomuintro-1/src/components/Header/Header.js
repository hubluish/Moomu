import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Moomu</div>
      <nav className="nav">
        <a href="#">SERVICE</a>
        <a href="#">EXPERIENCE</a>
        <a href="#">PRICE</a>
        <a href="#">CS 센터</a>
      </nav>
      <div className="user-menu"></div>
    </header>
  );
};

export default Header;