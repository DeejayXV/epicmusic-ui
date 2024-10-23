import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav className="menu">
        <Link to="/">Home</Link>
        </nav>
        <h4 className='miniTitle mt-4'>My Collection</h4>
        <nav className="menu">
        <Link to="/albums">Albums</Link>
        <Link to="/tracks">Tracks</Link>
        <Link to="/videos">Videos</Link>
        <Link to="/artists">Artists</Link>
        <Link to="/podcasts">Podcasts</Link>
        </nav>
      <div className="user-playlists">
        <h4 className='miniTitle mt-4'>Your Playlists</h4>
        <button className="create-playlist"> New Playlist + </button>
        <ul>
          <li>Electro</li>
          <li>Funk</li>
          <li>Metalcore</li>
          <li>Disco</li>
        </ul>
        
      </div>
    </div>
  );
};

export default Sidebar;
