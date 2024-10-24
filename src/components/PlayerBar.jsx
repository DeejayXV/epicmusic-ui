import React, { useState, useEffect } from 'react';
import '../styles/playerbar.css';

const PlayerBar = ({ track, onNext, onPrevious }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (track) {
      setIsPlaying(true); // Avvia la riproduzione quando viene selezionata una nuova traccia
    }
  }, [track]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="player-bar">
      {track ? (
        <>
          <div className="track-details">
            <img
              src={track.album.images[0].url}
              alt={track.name}
              style={{ width: '50px', height: '50px', marginRight: '15px' }}
            />
            <div>
              <div className="track-name">{track.name}</div>
              <div className="track-artist">{track.artists.map((artist) => artist.name).join(', ')}</div>
            </div>
          </div>
          <div className="player-controls">
            <button onClick={onPrevious}>⏮️</button>
            <button onClick={handlePlayPause}>
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            <button onClick={onNext}>⏭️</button>
          </div>
        </>
      ) : (
        <div className="no-track">No track selected</div>
      )}
    </div>
  );
};

export default PlayerBar;
