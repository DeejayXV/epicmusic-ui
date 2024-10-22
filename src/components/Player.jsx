import React from 'react';
import './Player.css';

const Player = () => {
  return (
    <div className="player">
      <div className="player-info">
        <img src="https://example.com/cover.jpg" alt="Current song" />
        <div className="song-details">
          <p>Welcome to Horrorwood</p>
          <p>Ice Nine Kills</p>
        </div>
      </div>
      <div className="controls">
        {/* Aggiungi qui i controlli di riproduzione */}
        <button>⏮️</button>
        <button>▶️</button>
        <button>⏭️</button>
      </div>
    </div>
  );
};

export default Player;
