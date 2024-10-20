import React from "react";

const Header = () => {
  return (
    <header className="header">
      <input type="text" placeholder="Search by artists, songs or albums" />
      <button>My channel</button>
      <img src="/path/to/profile-pic.jpg" alt="Profile" />
    </header>
  );
};

export default Header;
