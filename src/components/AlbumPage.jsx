import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AlbumPage = ({ playTrack }) => {
  const { albumId } = useParams(); // L'ID dell'album viene preso dai parametri URL.
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      try {
        // Richiede il token dal backend Spring Boot in esecuzione su localhost:3001
        const response = await axios.get('http://localhost:3001/api/spotify/token');
        setToken(response.data.access_token); // Salva il token di accesso.
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
      <h2>{album.name}</h2>
      <p>Artist: {album.artists[0].name}</p>
      <img src={album.images[0].url} alt={`${album.name} cover`} style={{ width: '300px', height: '300px' }} />
      <ul>
        {album.tracks.items.map((track) => (
          <li key={track.id} onClick={() => handleTrackClick(track)}>
            {track.name} - {Math.floor(track.duration_ms / 60000)}:{(Math.floor((track.duration_ms % 60000) / 1000)).toString().padStart(2, '0')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlbumPage;
