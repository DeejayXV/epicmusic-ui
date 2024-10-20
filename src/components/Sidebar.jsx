import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>EpicMusic</h2>
      <ul>
        <li>
          <Link to="/">Feed</Link>
        </li>
        <li>
          <Link to="/playlists">Playlists</Link>
        </li>
        <li>
          <Link to="/statistics">Statistics</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
