import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="brand">EpicMusic</h2>
      <nav className="menu">
        <Link to="/">Feed</Link>
        <Link to="/playlists">Playlists</Link>
        <Link to="/statistics">Statistics</Link>
        <Link to="/favorites">Favourites</Link>
        <Link to="/history">History</Link>
        <Link to="/podcasts">Podcasts</Link>
      </nav>
      <div className="user-playlists">
        <h3>Your Playlists</h3>
        <ul>
          <li>Electro</li>
          <li>Funk</li>
          <li>Metalcore</li>
          <li>Disco</li>
        </ul>
        <button className="create-playlist">Create new playlist +</button>
      </div>
    </div>
  );
};

export default Sidebar;
