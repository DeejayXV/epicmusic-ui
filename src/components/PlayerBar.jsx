import React, { useState, useEffect } from 'react';
import '../styles/playerbar.css';

const PlayerBar = ({ track, onNext, onPrevious }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // Progresso in millisecondi

  useEffect(() => {
    let interval;

    if (isPlaying && track) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= track.duration_ms) {
            clearInterval(interval);
            onNext(); // Passa automaticamente alla traccia successiva quando finisce la traccia corrente
            return 0;
          }
          return prevProgress + 1000; // Incrementa di 1 secondo (1000 ms)
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval); // Pulisci l'intervallo quando il componente viene smontato o la traccia cambia
  }, [isPlaying, track, onNext]);

  useEffect(() => {
    if (track) {
      setIsPlaying(false); // Imposta la traccia come non in riproduzione inizialmente
      setProgress(0); // Resetta il progresso per una nuova traccia
    }
  }, [track]);

  const handlePlayPause = () => {
    setIsPlaying((prevIsPlaying) => {
      if (!prevIsPlaying) {
        // Se stiamo passando da pausa a riproduzione, avvia il timer
        return true;
      } else {
        // Se stiamo mettendo in pausa, ferma il timer
        return false;
      }
    });
  };

  const handleProgressClick = (e) => {
    if (track) {
      const rect = e.target.getBoundingClientRect();
      const clickPosition = e.clientX - rect.left;
      const newProgress = (clickPosition / rect.width) * track.duration_ms;
      setProgress(newProgress);
    }
  };

  return (
    <div className="player-bar">
      {track ? (
        <>
          <div className="track-details">
            {track.album && track.album.images && track.album.images.length > 0 && (
              <img
                src={track.album.images[0].url}
                alt={track.name}
                style={{ width: '50px', height: '50px', marginRight: '15px' }}
              />
            )}
            <div>
              <div className="track-name">{track.name || "Unknown Track"}</div>
              <div className="track-artist">
                {track.artists ? track.artists.map((artist) => artist.name).join(', ') : "Unknown Artist"}
              </div>
            </div>
          </div>
          <div className="progress-container" onClick={handleProgressClick} style={{ width: '500px' }}>
            <div
              className="progress-bar"
              style={{ width: `${(progress / track.duration_ms) * 100}%` }}
            ></div>
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
