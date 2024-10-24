import React, { useState, useEffect } from 'react';
import '../styles/playerbar.css';

const PlayerBar = ({ trackUri }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Placeholder per inizializzare il player Spotify tramite Web Playback SDK
    if (trackUri) {
      console.log(`Playing track: ${trackUri}`);
      setIsPlaying(true);
    }
  }, [trackUri]);

  const handlePlayPause = () => {
    if (isPlaying) {
      console.log('Pausing track');
      setIsPlaying(false);
    } else {
      console.log('Playing track');
      setIsPlaying(true);
    }
  };

  return (
    <div className="player-bar">
      <button onClick={handlePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      {/* Altri pulsanti per la navigazione */}
    </div>
  );
};

export default PlayerBar;
