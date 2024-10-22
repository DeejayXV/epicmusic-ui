import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <input type="text" placeholder="Search by artists, songs or albums" className="search-bar" />
      <button className="my-channel">My channel</button>
    </header>
  );
};

export default Header;
