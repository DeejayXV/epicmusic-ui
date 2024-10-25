import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/albumPage.css';

const AlbumPage = ({ playTrack }) => {
  const { albumId } = useParams(); 
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      try {
        
        const response = await axios.get('http://localhost:3001/api/spotify/token');
        setToken(response.data.access_token); 
      } catch (error) {
        console.error('Error getting token:', error);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const fetchAlbum = async () => {
      if (!token) return;

      try {
        // Richiedi i dettagli dell'album dall'API di Spotify.
        const response = await axios.get(`https://api.spotify.com/v1/albums/${albumId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAlbum(response.data); // Salva i dati dell'album nello stato.
      } catch (error) {
        console.error('Error fetching album:', error);
        setError('Error fetching album data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAlbum();
  }, [token, albumId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!album) {
    return <div>No album found</div>;
  }

  const handleTrackClick = (track) => {
    const trackData = {
      id: track.id,
      name: track.name,
      artists: track.artists,
      album: album,
      uri: track.uri,
    };
    playTrack(trackData, album.tracks.items);
  };

  return (
    <div className="album-details">
      <div className="album-header">
        <img src={album.images[0].url} alt={`${album.name} cover`} className="album-cover" />
        <div className="album-info">
          <h2>{album.name}</h2>
          <p>Artist: {album.artists[0].name}</p>
        </div>
      </div>
      <ul className="track-list">
        {album.tracks.items.map((track) => (
          <li key={track.id} className="track-item" onClick={() => handleTrackClick(track)}>
            <span className="track-name">{track.name}</span>
            <span className="track-duration">{Math.floor(track.duration_ms / 60000)}:{(Math.floor((track.duration_ms % 60000) / 1000)).toString().padStart(2, '0')}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumPage;
